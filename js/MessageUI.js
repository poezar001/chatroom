export class MessageUI {
    constructor(ul) {
        this.ul = ul;
    }

    // clear li 
    clearli() {
        this.ul.innerHTML = "";
    }

    // render li
    renderli(dataobj) {
        // format time (use the correct property name: createdAt)
        const when = dateFns.formatDistance(dataobj.createdAt.toDate(), new Date(), { addSuffix: true });

        const htmllitag = `
            <li class="list-group-item">
                <span class="username">${dataobj.username}</span>
                <span class="message">${dataobj.message}</span>
                <div class="time">${when}</div>
            </li>
        `;

        this.ul.innerHTML += htmllitag;
    }

     userInfo(data) {
        const uid = data.uid;
        const email = data.email;
        const fullname = data.displayName;
        const photourl = data.photoURL || "https://static.thenounproject.com/png/65476-200.png";
        const createdtime = data.metadata.creationTime;

        const formatteddate = dateFns.format(new Date(createdtime), "dd MMM yyyy");

        const html = `
            <li class="list-group-item">
            <img src="${photourl}" width="50" class="rounded-circle me-2" alt="Profile Picture"/>
            </li>
            <li class="list-group-item">UID: ${uid}</li>
            <li class="list-group-item">Display Name: ${fullname}</li>
            <li class="list-group-item">Email: ${email}</li>
            <li class="list-group-item">Created At: ${formatteddate}</li>
        `;

        this.ul.innerHTML = html;
        }

}

