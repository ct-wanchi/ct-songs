document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const compressedData = params.get("data");

    if (!compressedData) {
        document.getElementById("setlist-header").textContent = "セットリストが見つかりません";
        return;
    }

    const setlistData = JSON.parse(LZString.decompressFromEncodedURIComponent(compressedData));
    const setlistHeader = document.getElementById("setlist-header");
    const setlistContainer = document.getElementById("setlist");

    setlistHeader.textContent = setlistData.title;
    let number = 1;
    setlistData.songs.forEach(songId => {
        const song = ctSongs.find(s => s.id === songId);
        if (song) {
            const songElement = document.createElement("div");
            songElement.className = "card";
            songElement.innerHTML = `
                <span class="card-number">${number++}</span>
                <div class="card-content">
                    <a href="${song.link}" target="_blank" rel="noopener noreferrer">
                    <img src="${song.image}" alt="${song.title}">
                    <span class="play-icon"></span>
                </a>
                    <span class="card-title">${song.title}</span>
                </div>
            `;
            setlistContainer.appendChild(songElement);
        } else if (songId === 999) {
            const encoreElement = document.createElement("div");
            encoreElement.className = "card encore";
            encoreElement.innerHTML = `
                <div class="card-content">
                    <span class="card-title">Encore</span>
                </div>
            `;
            setlistContainer.appendChild(encoreElement);
        }
    });

    const shareSetlistButton = document.getElementById("share-setlist-button");
    shareSetlistButton.addEventListener("click", () => {
        const shareUrl = window.location.href;
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert("セットリストのURLをクリップボードにコピーしました！");
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
                    text: "私のセットリストを共有します！",
                    url: shareUrl
                });
            } catch (error) {
                alert("共有に失敗しました。");
            }
        } else {
            alert("このデバイスでは共有機能がサポートされていません。");
        }
    });
});