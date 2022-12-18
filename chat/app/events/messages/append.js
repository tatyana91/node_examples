import eventBus from '#app/core/eventbus.js'

export default class MessagesAppendEvent{
	static name = Symbol('MessagesAppendEvent');

	constructor(message){
		this.message = message;
		eventBus.emit(this.constructor.name, this);
	}
}