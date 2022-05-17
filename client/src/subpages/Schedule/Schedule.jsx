import * as React from 'react'
import Paper from '@mui/material/Paper'
import {
    ViewState,
    EditingState,
    GroupingState,
    IntegratedGrouping,
    IntegratedEditing,
} from '@devexpress/dx-react-scheduler'
import {
    Scheduler,
    Resources,
    WeekView,
    Appointments,
    AppointmentTooltip,
    AppointmentForm,
    GroupingPanel,
    DragDropProvider,
} from '@devexpress/dx-react-scheduler-material-ui'
import { blue, orange } from '@mui/material/colors'
// import { data as appointments } from './grouping'
import { locale } from './grouping'

const resources = [
    {
        fieldName: 'teacherName',
        title: 'Учитель',
        instances: [
            { text: 'Наталья Верещагина', id: 1, color: blue },
            { text: 'Чолпон Разакова', id: 2, color: orange },
        ],
    },
]
const groupOrientation = (viewName) => viewName.split(' ')[0]
const grouping = [
    {
        resourceName: 'teacherName',
    },
]

export const Schedule = () => {
    const [data, setData] = React.useState(JSON.parse(sessionStorage.getItem('data')) || [])
    const onCommitChanges = React.useCallback(
        ({ added, changed, deleted }) => {
            if (added) {
                const startingAddedId =
                    data.length > 0 ? data[data.length - 1].id + 1 : 0
                setData([...data, { id: startingAddedId, ...added }])
                sessionStorage.setItem('data', JSON.stringify([...data, { id: startingAddedId, ...added }]))
            }
            if (changed) {
                setData(
                    data.map((appointment) =>
                        changed[appointment.id]
                            ? { ...appointment, ...changed[appointment.id] }
                            : appointment
                    )
                )
                sessionStorage.setItem('data', 
                    JSON.stringify(data.map((appointment) =>
                        changed[appointment.id]
                            ? { ...appointment, ...changed[appointment.id] }
                            : appointment
                    ))
                )
            }
            if (deleted !== undefined) {
                setData(
                    data.filter((appointment) => appointment.id !== deleted)
                )
                sessionStorage.setItem('data', JSON.stringify(data.filter((appointment) => appointment.id !== deleted)))
            }
        },
        [setData, data]
    )

    console.log(data)

    return (
        <Paper>
            <Scheduler locale={'ru'} data={data} height={580}>
                <ViewState />
                <EditingState onCommitChanges={onCommitChanges} />
                <GroupingState
                    grouping={grouping}
                    groupOrientation={groupOrientation}
                />

                <WeekView
                    startDayHour={9}
                    endDayHour={19}
                    excludedDays={[0, 6]}
                    cellDuration={60}
                    name="Vertical Orientation"
                />
                {/* <WeekView
                    startDayHour={9}
                    endDayHour={17}
                    excludedDays={[0, 6]}
                    name="Horizontal Orientation"
                /> */}

                <Appointments />
                <Resources data={resources} mainResourceName="teacherName" />

                <IntegratedGrouping />
                <IntegratedEditing />
                <AppointmentTooltip
                    showCloseButton
                    showDeleteButton
                    showOpenButton
                />
                <AppointmentForm messages={locale} />

                <GroupingPanel />
                {/* <Toolbar locale={'ru'} /> */}
                {/* <ViewSwitcher locale={'ru'} /> */}
                <DragDropProvider />
            </Scheduler>
        </Paper>
    )
}
