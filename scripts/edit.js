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
            evt.item.remove();
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

    const batteryOrderToggle = document.getElementById("battery-order");

    function updatePositionVisibility() {
        const useOrder = batteryOrderToggle.checked;
        document.querySelectorAll('.card-position').forEach(sel => {
            sel.style.display = useOrder ? "" : "none";
        });
        document.querySelectorAll('.card.encore').forEach(sel => {
            sel.querySelector('.card-title').textContent = useOrder ? "投手" : "Encore";
            sel.querySelector('.card-shortName').textContent = useOrder ? "投手" : "Encore";
        });
    }

    batteryOrderToggle.addEventListener("change", updatePositionVisibility);

    ctSongs.forEach(song => {
        songList.appendChild(createSongListCard(song));
    });
    songList.appendChild(createEncoreCard());

    setlist.innerHTML = "";

    updatePositionVisibility();

    const createSetlistButton = document.getElementById("create-setlist-button");
    createSetlistButton.addEventListener("click", () => {
        const setlistTitle = document.getElementById("setlist-title").value;
        const setlistItems = Array.from(setlist.querySelectorAll('.card')).map(card => { 
            const positionSelect = card.querySelector('.card-position');
            const position= positionSelect ? parseInt(positionSelect.value, 10) : 0;
            return { 
                id: parseInt(card.dataset.songId, 10),
                p: position
            };
        });

        const setlistData = {
            title: setlistTitle,
            order: batteryOrderToggle.checked,
            songs: setlistItems
        };

        const compressedData = LZString.compressToEncodedURIComponent(JSON.stringify(setlistData));
        window.location.href = `setlist.html?d=${compressedData}`;
    });

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
                <select class="card-position" name="position" value="1">
                    <option value="1">先発</option>    
                    <option value="2">捕手</option>
                    <option value="3">一塁</option>
                    <option value="4">二塁</option>
                    <option value="5">三塁</option>
                    <option value="6">遊撃</option>
                    <option value="7">左翼</option>
                    <option value="8">中堅</option>
                    <option value="9">右翼</option>
                    <option value="10">DH</option>
                    <option value="11">中継</option>    
                    <option value="12">抑え</option>
                </select>
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
