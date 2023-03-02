import {STATUSES, PRIORITIES, list} from './variables.js'

function isValidTask(task) {
    return list.find( item => item.name === task)
  }
  
  function isValidStatus(status) {
    return status === STATUSES.TO_DO || status === STATUSES.IN_PROGRESS || status === STATUSES.DONE;
  }
  
  function isValidPriority(priority) {
    return priority === PRIORITIES.LOW || priority === PRIORITIES.MEDIUM || priority === PRIORITIES.HIGH;
  }
  
  function getTask(task) {
    return task.find(item => item.name === task)
  }

export {isValidPriority, isValidStatus, isValidTask, getTask}