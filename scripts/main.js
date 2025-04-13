document.addEventListener("DOMContentLoaded", () => {
    const songList = document.getElementById("song-list");
    const setlist = document.getElementById("setlist");

    // 楽曲カードを生成
    if (!ctSongs || !Array.isArray(ctSongs)) {
        console.error("ctSongs is not defined or not an array.");
        return;
    }

    // song-list用カードを作成する関数
    function createSongListCard(song) {
        const songListCard = document.createElement("div");
        songListCard.className = "card";
        songListCard.dataset.songId = song.id; // IDをデータ属性として保存
        songListCard.innerHTML = `
            <span class="drag-icon">drag_indicator</span>
            <div class="card-content">
                <img src="${song.image}" alt="${song.title}">
                <span class="card-shortName">${song.shortName}</span>
                <span class="card-title">${song.title}</span>
            </div>
        `;
        return songListCard;
    }

    // song-listにカードを追加
    ctSongs.forEach(song => {
        const songListCard = createSongListCard(song);
        songList.appendChild(songListCard);
    });


    Sortable.create(songList, {
        group: {
            name: 'shared',
            pull: 'clone',
            put: true
        },
        handle:'.card',
        draggable: '.card',
        sort: false // 順序を固定
    });


    Sortable.create(setlist, {
        group: {
            name: 'shared',
            pull: true,
            put: true
        },
        sort: true,
        draggable: '.card',
        handle: '.card',
        onRemove: (evt) => {
            // setlistからアイテムが削除された場合の処理
            const removedElement = evt.item;
            removedElement.remove(); // 完全に削除
        }
    });

    // 初期状態ではsetlistを空にする
    setlist.innerHTML = "";
});
