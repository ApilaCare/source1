var mongoose = require('mongoose');

var residentSchema = new mongoose.Schema({

  // administrative information
  firstName: {type: String, required: true},
  middleName: {type: String},
  lastName: {type: String, required: true},
  maidenName: {type: String},
  birthDate: {type: Date, required: true},
  addmissionDate: {type: Date},
  sex: {type: String, required: true},

  // bathing information
  type: {type: String}, // shower, tub, spit bath
  time: {type: String}, // morning, evening, before breakfast, after breakfast, after supper, before supper?
  frequency: {type: String}, // 1 per week, twice a week, everyday,
  acceptanceOfBathing: {type: String}, // likes, dislikes

  // mobility information
  insideApartment: {
    useOfAssistiveDevice: {type: String}, // walker, cane, wheelchair
    assitanceWithDevice: {type: String},
    specialAmbulationNeeds: {type: String},
  },
  outsideApartment: {
    useOfAssistiveDevice: {type: String}, // walker, cane, wheelchair
    assitanceWithDevice: {type: String},
    specialAmbulationNeeds: {type: String},
  },
  transfers: {type: String}, // standby, independent, full assist, transfer pole
  fallRisk: {type: String},
  bedReposition: {type: Boolean},

  // allergy information
  foodAlergies: [String],
  medicationAlergies: [String],

  // sleep information
  usualBedTime: {type: String},
  usualArisingTime: {type: String},
  nap: {type: Boolean},
  assistanceToBed: {type: String}, // medication, positioning, pillows, drink, alcohol, hot tea, warm milk
  sleepsThroughNight: {type: Boolean},
  sleepDisturbance: {type: String},

  // continent information
  bowelContinent: {type: String}, // always, sometimes, never
  constipated: {type: String}, // always, sometimes, never
  laxative: {type: String}, // always, sometimes, never
  bladderContinent: {type: String}, // always, sometimes, never
  dribbles: {type: String}, // always, sometimes, never
  catheter: {type: Boolean}, // always, sometimes, never
  toiletingDevice: {type: String}, // urnal, seat riser, bedside comod,

  // nutrition information
  overallNutrition: {type: String}, // good, poor
  poorNutritionIntervention: {type: String}, // shake,
  diabetic: {type: Boolean},
  diabeticType: {type: String}, // diet controlled, medication controlled
  regularBloodSugarMonitoring: {type: Boolean},
  bedtimeSnack: {type: Boolean},
  adaptiveEquipment: {type: String}, // plate guard, silverware
  needsFoodInSmallPeices: {type: Boolean},
  typeOfDiet: {type: String}, // puried, ground, regular
  foodLikes: [String],
  foodDislikes: [String],

  // physical condition information
  height: {type: Number},
  skinCondition: {type: String},
  wearsHearingAid: {type: String}, // yes, no, never
  hearing: {
    rightEar: {type: String}, // adequate, adequate with aid, poor
    leftEar: {type: String}, // adequate, adequate with aid, poor
  },
  vision: {
    rightEye: {type: String}, // adequate, adequate with aid, poor
    leftEye: {type: String}, // adequate, adequate with aid, poor
  },
  teeth: {
    upperDentureFit: {type: Boolean},
    upperTeeth: {type: String}, // Has own, Has dentures, neither, has partial
    lowerDentureFit: {type: Boolean},
    lowerTeeth: {type: String}, // Has own, Has dentures, neither, has partial
  },
  teethCondition: {type: String}, // poor, fair, good, excellent

  // psychosocial information
  status: [String], // alert, friendly
  responsiveness: {type: String},
  mood: {type: String}, //
  comprehension: {type: String}, // slow, moderate, quick
  personalHabits: {
    smokes: {type: Boolean},
    alcohol: {type: Boolean},
    other: {type: String},
  },
  generalActivityParticipation: {type: String},
  diningRoomParticipation: {type: String}, // scale that is from: alone > minor > major > amazing
  busRideParticipation: {type: String},
  fitnessClassParticipation: {type: String},
  timeInRoom: {type: String}, // recliner, bed, wheelchair
  preferedActivites: {type: String}, // walks,
  useFitnessEquipmentIndependently: {type: Boolean},
  familyInvolvement: {type: String}, // none, some, frequent

  // pain information
  havePain: {type: Boolean},
  painLocation: {type: String},
  painDescription: {type: String},
  maxPainTime: {type: String},
  painIncreasedBy: {type: String},
  painDecreasedBy: {type: String},

  // vitals information
  temperature: {type: Number},
  bloodPressureSystolic: {type: Number},
  bloodPressureDiastolic: {type: Number},
  oxygenSat: {type: Number},
  pulse: {type: Number},
  vitalsPain: {type: Number, min: 0, max: 10},
  respiration: {type: Number}
});

mongoose.model('Resident', residentSchema);
