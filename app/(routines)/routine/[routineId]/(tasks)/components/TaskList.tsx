import { isParticipating } from '@/app/Service/routine';
import React, { FC } from 'react'

interface TaskListProps {
  
}

const TaskList: FC<TaskListProps> = ({  }) => {
  const isParticipant = isParticipating()
  return (
    <div>
     TaskList
    </div>
  )
}

export default TaskList;