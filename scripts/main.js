document.addEventListener("DOMContentLoaded", () => {
    const songList = document.getElementById("song-list");
    const setlist = document.getElementById("setlist");
    
    // 楽曲カードを生成
    if (!ctSongs || !Array.isArray(ctSongs)) {
        console.error("ctSongs is not defined or not an array.");
        return;
    }

    ctSongs.forEach(song => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <a href="${song.link}" target="_blank">
                <img src="${song.image}" alt="${song.Title}">
            </a>
            <span>${song.Title}</span>
            <span class="drag-icon">drag_indicator</span> <!-- Google マテリアルアイコン -->
        `;
        songList.appendChild(card);
    });

    // Draggableの設定
    const draggable = new Draggable.Sortable([songList, setlist], { // 修正: Draggable をグローバル参照
        draggable: ".card",
        mirror: {
            constrainDimensions: true,
            appendTo: document.body,
            delay: 0, // アニメーションの遅延を無効化
        },
    });

    // ドロップ先の要素を薄いグレーにする
    draggable.on("sortable:sorted", (event) => {
        if (event.newContainer === setlist || event.newContainer === songList) {
            event.dragEvent.source.classList.add("dropped"); // クラスを追加
        }
    });

    // セットリスト制限と曲順番号の更新
    const updateSetlistNumbers = () => {
        const setlistItems = setlist.querySelectorAll(".card");
        setlistItems.forEach((item, index) => {
            // 番号を追加
            item.querySelector(".number")?.remove(); // 古い番号を削除
            const numberSpan = document.createElement("span");
            numberSpan.className = "number";
            numberSpan.textContent = `${index + 1}.`;
            item.prepend(numberSpan);
        });

        // song-list内のカードから番号を削除
        const songListItems = songList.querySelectorAll(".card");
        songListItems.forEach(item => {
            item.querySelector(".number")?.remove(); // 番号を削除
        });
    };

    draggable.on("sortable:stop", () => {
        const setlistItems = setlist.querySelectorAll(".card");
        if (setlistItems.length > 20) {
            alert("セットリストは最大20曲までです！");
            setlistItems[setlistItems.length - 1].remove();
        }
        updateSetlistNumbers();
    });

    // MutationObserverでセットリストの変更を監視
    const observer = new MutationObserver(() => {
        updateSetlistNumbers();
    });

    observer.observe(setlist, { childList: true });
});
