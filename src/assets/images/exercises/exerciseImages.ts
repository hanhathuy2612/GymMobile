import { ImageSourcePropType } from 'react-native';

// Static mapping of all exercise images
// Metro bundler requires all assets to be statically analyzable
export const exerciseImages: Record<string, ImageSourcePropType> = {
    'Barbell Back Squats.gif': require('./Barbell Back Squats.gif'),
    'Barbell Bench Press.gif': require('./Barbell Bench Press.gif'),
    'Barbell Bent Over Rows.gif': require('./Barbell Bent Over Rows.gif'),
    'Barbell Clean and Press.gif': require('./Barbell Clean and Press.gif'),
    'Barbell Close-Grip Press.gif': require('./Barbell Close-Grip Press.gif'),
    'Barbell Deadlift High Pull.gif': require('./Barbell Deadlift High Pull.gif'),
    'Barbell Deadlifts.gif': require('./Barbell Deadlifts.gif'),
    'Barbell Drag Curls.gif': require('./Barbell Drag Curls.gif'),
    'Barbell Romanian Deadlifts.gif': require('./Barbell Romanian Deadlifts.gif'),
    'Dumbbell Bicep Curls.gif': require('./Dumbbell Bicep Curls.gif'),
    'Dumbbell Calf Raises.gif': require('./Dumbbell Calf Raises.gif'),
    'Dumbbell Chest Fly 2.gif': require('./Dumbbell Chest Fly 2.gif'),
    'Dumbbell Chest Fly.gif': require('./Dumbbell Chest Fly.gif'),
    'Dumbbell Concentration Curls.gif': require('./Dumbbell Concentration Curls.gif'),
    'Dumbbell Front Raises.gif': require('./Dumbbell Front Raises.gif'),
    'Dumbbell Goblet Squats.gif': require('./Dumbbell Goblet Squats.gif'),
    'Dumbbell Lateral Raises.gif': require('./Dumbbell Lateral Raises.gif'),
    'Dumbbell Lunges.gif': require('./Dumbbell Lunges.gif'),
    'Dumbbell One-Arm Row 2.gif': require('./Dumbbell One-Arm Row 2.gif'),
    'Dumbbell One-Arm Row.gif': require('./Dumbbell One-Arm Row.gif'),
    'Dumbbell Pullover.gif': require('./Dumbbell Pullover.gif'),
    'Dumbbell Rear Delt Fly.gif': require('./Dumbbell Rear Delt Fly.gif'),
    'Dumbbell Renegade Rows.gif': require('./Dumbbell Renegade Rows.gif'),
    'Dumbbell Shrugs.gif': require('./Dumbbell Shrugs.gif'),
    'Dumbbell Thrusters.gif': require('./Dumbbell Thrusters.gif'),
    'Hammer Curls.gif': require('./Hammer Curls.gif'),
    'Hanging Leg Raises.gif': require('./Hanging Leg Raises.gif'),
    'Inverted Rows.gif': require('./Inverted Rows.gif'),
    'Leg Raises.gif': require('./Leg Raises.gif'),
    'Plank Hold.gif': require('./Plank Hold.gif'),
    'Plank with Dumbbell Drag.gif': require('./Plank with Dumbbell Drag.gif'),
    'Russian Twists.gif': require('./Russian Twists.gif'),
    'Wall Sit.gif': require('./Wall Sit.gif'),
    'Weighted Crunches.gif': require('./Weighted Crunches.gif'),
};

// Helper function to get image source
export const getExerciseImage = (gifName: string): ImageSourcePropType | undefined => {
    return exerciseImages[gifName];
};