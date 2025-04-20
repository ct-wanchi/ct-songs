document.addEventListener("DOMContentLoaded", () => {
    const songList = document.getElementById("song-list");
    const setlist = document.getElementById("setlist");

    Sortable.create(songList, {
        group: {
            name: 'shared',
            pull: 'clone',
            put: true
        },
        handle: '.draggable',
        draggable: '.card',
        sort: false,
        onAdd: (evt) => {
            //if (evt.from === setlist) {
                evt.item.remove();
            //}
        }
    });

    Sortable.create(setlist, {
        group: {
            name: 'shared',
            pull: true,
            put: true
        },
        sort: true,
        draggable: '.card',
        handle: '.draggable',
        onAdd: updateCardNumbers,
        onChange: updateCardNumbers,
        onEnd: updateCardNumbers
    });

    ctSongs.forEach(song => {
        songList.appendChild(createSongListCard(song));
    });
    songList.appendChild(createEncoreCard());
    setlist.innerHTML = "";

    const createSetlistButton = document.getElementById("create-setlist-button");
    createSetlistButton.addEventListener("click", () => {
        const setlistTitle = document.getElementById("setlist-title").value;
        const setlistItems = Array.from(setlist.querySelectorAll('.card')).map(card => parseInt(card.dataset.songId, 10));

        const setlistData = {
            title: setlistTitle,
            songs: setlistItems
        };

        const compressedData = LZString.compressToEncodedURIComponent(JSON.stringify(setlistData));
        window.location.href = `setlist.html?data=${compressedData}`;
    });

    // 追加: タイトル入力欄で全選択
    const setlistTitleInput = document.getElementById("setlist-title");
    setlistTitleInput.addEventListener("focus", function() {
        this.select();
    });

    function createSongListCard(song) {
        const songListCard = document.createElement("div");
        songListCard.className = "card";
        songListCard.dataset.songId = song.id;
        songListCard.innerHTML = `
            <div class="card-content">
                <span class="card-number draggable"></span>
                <a href="${song.link}" target="_blank" rel="noopener noreferrer">
                    <img src="${song.image}" alt="${song.title}">
                    <span class="play-icon"></span>
                </a>
                <span class="card-shortName">${song.shortName}</span>
                <span class="card-title">${song.title}</span>
            </div>
            <span class="drag-icon draggable">drag_indicator</span>
        `;
        return songListCard;
    }

    function createEncoreCard() {
        const songListCard = document.createElement("div");
        songListCard.className = "card encore";
        songListCard.dataset.songId = 999;
        songListCard.innerHTML = `
            <div class="card-content">
                <span class="card-shortName">Encore</span>
                <span class="card-title">Encore</span>
            </div>
            <span class="drag-icon draggable">drag_indicator</span>
        `;
        return songListCard;
    }

    function updateCardNumbers() {
        const cards = setlist.querySelectorAll('.card');
        let encoreCardFound = false;
        cards.forEach((card, index) => {
            if (card.dataset.songId === "999") {
                encoreCardFound = true;
                return;
            }
            const numberElement = card.querySelector('.card-number');
            if (numberElement) {
                const formattedNumber = (encoreCardFound ? index : index + 1).toString().padStart(2, '0') + '.';
                numberElement.textContent = formattedNumber;
            }
        });
    }
});
