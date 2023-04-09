const client =  (() =>  {
    let serviceWorker = undefined;
    const notificationbutton = document.getElementById("btn-notify");

    const showNotificationButton = () => {
        notificationbutton.style.display = "block";
        notificationbutton.addEventListener("click", showNotification);
    }

    const showNotification = () => {
        console.log("button clicked");
        const simpleTextNotifications = reg => reg.showNotification("First Notification")

        const customizedNotifications = reg => {
            const options ={
                body: 'Spring Semester is Completed',
                icon: "imgs/icon.png",
            actions: [
                {action: "search", title: "Search PPU"},
                {action: "close", title: "Nevermind"},
            ],
            data: {
                notificationTime: Date.now(),
                githubuser: "craigpulfedu",
            }
            }


            reg.showNotification('Second Notification', options)
        }

        navigator.serviceWorker.getRegistration()
        .then(registration => customizedNotifications(registration));
    }

    const checkNotificationSupport = () => {
        if(!('Notification' in window)) {
            return Promise.reject("This browser doesn't support notifications");
        }
        console.log("The browser supports Notifications");
        return Promise.resolve("ok!");
    }

    const registerServiceWorker = () => {
        if(!('serviceworker') in navigator) {
        return Promise.reject("service worker is not registered yet");
    }

    return navigator.serviceWorker.register('service-worker.js')
    .then(regObj => {
        console.log("service worker is registered sucessfully");
        serviceWorkerRegObj = regObj;
        showNotificationButton();
    })
}

    const requestNotificationPermissions = () => {
        return Notification.requestPermission(status => {
            console.log("Request Permission Status:", status);
        })
    }

    //How the constructors are called 
    checkNotificationSupport()
        .then(registerServiceWorker)
        .then(requestNotificationPermissions)
        .catch(err => console.error(err))


})();