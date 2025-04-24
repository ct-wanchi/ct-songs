document.addEventListener("DOMContentLoaded", () => {
    const positionsHash = {
        1: "先発",
        2: "捕手",
        3: "一塁",
        4: "二塁",
        5: "三塁",
        6: "遊撃",
        7: "左翼",
        8: "中堅",
        9: "右翼",
        10: "DH",
        11: "中継",
        12: "抑え"
    };
    const params = new URLSearchParams(window.location.search);
    const compressedData = params.get("d");

    if (!compressedData) {
        document.getElementById("sharelist-header").textContent = "Music Listが見つかりません";
        return;
    }

    const setlistData = JSON.parse(LZString.decompressFromEncodedURIComponent(compressedData));
    const setlistHeader = document.getElementById("sharelist-header");
    const setlistContainer = document.getElementById("sharelist");
    const enableBatteryOrder = setlistData.order;
    setlistHeader.textContent = setlistData.title;

    let number = 1;
    setlistData.songs.forEach(item => {
        const song = ctSongs.find(s => s.id === item.id);
        if (song) {
            const formattedNumber = (number++).toString().padStart(2, '0') + '.';
            const songElement = document.createElement("div");
            const posisionHtml = enableBatteryOrder ? `<span class="card-position">${ positionsHash[item.p]}</span>` :"";            songElement.className = "card";
            songElement.innerHTML = `
                <div class="card-content">
                    <span class="card-number">${formattedNumber}</span>
                    ${posisionHtml}
                    <a href="${song.link}" target="_blank" rel="noopener noreferrer">
                    <img src="${song.image}" alt="${song.title}">
                    <span class="play-icon"></span>
                </a>
                    <span class="card-title">${song.title}</span>
                </div>
            `;
            setlistContainer.appendChild(songElement);
        } else if (item.id === 999) {
            const encoreElement = document.createElement("div");
            encoreElement.className = "card encore";
            encoreElement.innerHTML = `
                <div class="card-content">
                    <span class="card-title">${enableBatteryOrder ? '投手' : 'Encore'}</span>
                </div>
            `;
            setlistContainer.appendChild(encoreElement);
        }
    });

    const shareSetlistButton = document.getElementById("share-setlist-button");
    shareSetlistButton.addEventListener("click", () => {
        const shareUrl = window.location.href;
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert("URLをクリップボードにコピーしました！");
        }).catch(() => {
            alert("URLのコピーに失敗しました。");
        });
    });

    const shareNativeButton = document.getElementById("share-native-button");
    shareNativeButton.addEventListener("click", async () => {
        const shareUrl = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: setlistData.title,
                    text: `${setlistData.title} #CNADYTUNE #きゃんむり`,
                    url: shareUrl
                });
            } catch (error) {
                console.error("Error sharing:", error);
            }
        } else {
            alert("このデバイスでは共有機能がサポートされていません。");
        }
    });
});