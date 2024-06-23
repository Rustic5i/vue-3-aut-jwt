const eventBus = {
    on(event, callback) {
        document.addEventListener(event, (e) => callback(e.detail));
    },
    dispatch(event, data) {
        document.dispatchEvent(new CustomEvent(event, { detail: data }));
    },
    remove(event, callback) {
        document.removeEventListener(event, callback);
    },
};

export default eventBus;
//– on()метод присоединяет объект EventListenerк documentобъекту. Будет callbackвызван, когда его eventуволят.
// – dispatch()метод запускает eventиспользование CustomEventAPI.
// – remove()метод удаляет прикрепленное eventиз documentобъекта.
//
// Затем мы импортируем EventBusкомпонент приложения и слушаем "logout"событие.
//https://www.bezkoder.com/vue-3-refresh-token/