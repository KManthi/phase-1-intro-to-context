function createEmployeeRecord(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents:[],
        timeOutEvents: []

    }
}

function createEmployeeRecords (employeeRowData) {
    return employeeRowData.map(function(row) {
        return createEmployeeRecord(row);
    });
}

function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, time] = dateStamp.split(' ');
    const [year, month, day] = date.split('-');
    const [hour, minute] = time.split(' ');

    employeeRecord.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour),
        date: `${year}-${month}-${day}`
    })

    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, time] = dateStamp.split(' ');
    const [year, month, day] = date.split('-');
    const [hour, minute] = time.split(' ');

    employeeRecord.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour),
        date: `${year}-${month}-${day}`
    })
    
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {

    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

    const timeIn = timeInEvent.hour;
    const timeOut = timeOutEvent.hour;
    const hoursWorked = (timeOut-timeIn)/100;

    return hoursWorked;
}

function wagesEarnedOnDate(employeeRecord, date) {

    let payOwed = hoursWorkedOnDate(employeeRecord,date) * employeeRecord.payPerHour;

    return payOwed;    
}

function allWagesFor(employeeRecord) {

    const allDates = employeeRecord.timeInEvents.map(event => event.date);

    let allWages = 0;

    allDates.forEach(date => {
        allWages += wagesEarnedOnDate(employeeRecord, date);
    });

    return allWages;
}

function calculatePayroll(employeeRecords) {

    let payroll = 0;

    employeeRecords.forEach(employeeRecord => {
        const employeePay = allWagesFor(employeeRecord);

        payroll += employeePay;
    })

    return payroll;
}
