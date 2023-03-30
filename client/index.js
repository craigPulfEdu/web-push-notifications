const client =  (() =>  {
    let serviceWorker = undefined;
    const notificationbutton = document.getElementById("btn-notify");

    const showNotificationButton = () => {
        notificationbutton.style.display = "block";
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