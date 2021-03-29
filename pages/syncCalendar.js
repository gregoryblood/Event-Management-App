import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Calendar from 'expo-calendar';

export default function App() {
  useEffect(() => {
    (async () => {
        //Check calendar access
        const { status } = await Calendar.getCalendarPermissionsAsync();
        if ( status != 'granted') { //if no access request
            const { status } = await Calendar.requestCalendarPermissionsAsync();
            if (status === 'granted') {
                await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
            }
        }
        
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Calendar Module Example</Text>
      <Button title="Create a new calendar" onPress={createCalendar} />
    </View>
  );
}
//For ios it will get the user's default calendar
async function getDefaultCalendarSource() {
  const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
  const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
  return defaultCalendars[0].source;
}

async function createCalendar() {
  const defaultCalendarSource =
    Platform.OS === 'ios'
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: 'OSU Events' };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: 'OSU Events',
    color: 'Orange',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: 'internalCalendarName',
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
  console.log(`Your new calendar ID is: ${newCalendarID}`);
}
