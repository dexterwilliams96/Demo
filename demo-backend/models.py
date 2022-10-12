


class employee:

    def __init__(self, employeeID, employeeDOB, employeeName, employeeGrade, employeeTeamID):
        self.employeeID = employeeID
        self.employeeDOB = employeeDOB
        self.employeeName = employeeName
        self.employeeGrade = employeeGrade
        self.employeeTeamID = employeeTeamID

    # Methods-

    def changeEmployeeTeam(self, newEmployeeTeamID):
        self.employeeTeamID = newEmployeeTeamID

class employeeTask:

    def __init__(self, employeeTaskContent, employeeTaskDeadline, employeeTaskStartDate, taskEmployeeID):
        self.employeeTaskContent = employeeTaskContent
        self.employeeTaskDeadline = employeeTaskDeadline
        self.employeeTaskStartDate = employeeTaskStartDate
        self.taskEmployeeID = taskEmployeeID
        #self.employeeTaskComments = []