import eventBus from '#app/core/eventbus.js'

export default class BetsAppendEvent{
	static name = Symbol('BetsAppendEvent');

	constructor(bet){
		this.bet = bet;
		eventBus.emit(this.constructor.name, this);
	}
}