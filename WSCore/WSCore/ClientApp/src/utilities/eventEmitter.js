import EventEmitter from 'events'

const eventEmitter = new EventEmitter()

//turn off the limit of eventEmitter
eventEmitter.setMaxListeners(0)

export default eventEmitter
