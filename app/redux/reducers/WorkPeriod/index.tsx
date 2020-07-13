const WorkPeriod = (
  state = {
    isStarted: false,
    id: "",
    dateStarted: "",
    dateStartedString: "",
    time: "",
    date: "",
    dateEnded: "",
    note: "",
    ticketsId: [],
    userId: "",
    department: "",
    fileName: "",
    workedFor: "",
    year: "",
    month: "",
    week: "",
    day: "",
  },
  action
) => {
  switch (action.type) {
    case "STARTWORKPERIOD":
      state = {
        ...state,
        isStarted: true,
        id: action.id,
        dateStarted: action.dateStarted,
        dateStartedString: action.dateStartedString,
        time: "",
        date: action.date,
        dateEnded: action.dateEnded,
        note: action.note,
        ticketsId: action.ticketsId,
        userId: action.userId,
        department: action.department,
        fileName: action.fileName,
        workedFor: action.workedFor,
        year: action.year,
        month: action.month,
        week: action.week,
        day: action.day,
      };
      break;
    case "UPDATEWORKPERIOD":
      state = {
        ...state,
        id: "",
        isStarted: true,
        dateStarted: action.dateStarted,
        time: action.time,
        date: action.date,
        dateEnded: action.dateEnded,
        note: action.note,
        ticketsId: action.ticketsId,
        userId: action.userId,
        department: action.department,
        fileName: action.fileName,
        workedFor: "",
        year: action.year,
        month: action.month,
        week: action.week,
        day: action.day,
      };
      break;
    case "ENDWORKPERIOD":
      state = {
        ...state,
        isStarted: false,
        dateStarted: "",
        dateStartedString: "",
        time: "",
        date: "",
        dateEnded: "",
        note: "",
        ticketsId: [],
        userId: "",
        department: "",
        fileName: "",
        workedFor: "",
        year: "",
        month: "",
        week: "",
        day: "",
      };
      break;
    default:
      return state;
  }

  return state;
};

export default WorkPeriod;
