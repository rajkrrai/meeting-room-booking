const eventsList = [
  {
    'title': 'All Day Event very long title',
    'allDay': true,
    'start': new Date(2022, 12, 4),
    'end': new Date(2022, 12, 3)
  },
  {
    'title': 'Long Event',
    'start': new Date(2022, 9, 9),
    'end': new Date(2022, 9, 10)
  },

  {
    'title': 'DTS STARTS',

    'start': new Date('Mon Oct 03 2022 09:32:00 GMT+0530 (India Standard Time)'),

    'end': new Date('Mon Oct 03 2022 10:32:00 GMT+0530 (India Standard Time)'),
  },
  {
    'title': 'DTS STARTS 1',
    //'allDay': true,

    'start': new Date('Mon Oct 06 2022 09:32:00 GMT+0530 (India Standard Time)'),

    'end': new Date('Mon Oct 06 2022 08:32:00 GMT+0530 (India Standard Time)'),
    'room': 'Room 1'
  },
  {
    'title': 'DTS STARTS 2',
    //'allDay': true,

    'start': new Date('Mon Oct 06 2022 09:32:00 GMT+0530 (India Standard Time)'),

    'end': new Date('Mon Oct 06 2022 08:32:00 GMT+0530 (India Standard Time)'),
    'room': 'Room 2',
    'capacity': 3,
    'bookedBy': 'rajesh',
    'bookedFor': 'apoorva',
    'reason': ''
  },

]

export default eventsList