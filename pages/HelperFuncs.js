export function MilToCil(time) {
    time = time.split(" ")[0];  // Remove GMT+...... from time
    time = time.replace(/:\d\d([ ap]|$)/,'$1'); // remove seconds from time
    let H = +time.substr(0, 2);
    let hour = H % 12 || 12; 
    let ampm = (H < 12 || H === 24) ? "AM" : "PM"; // Return AM or PM depedning of 24 Hour time
    time = hour + time.substr(2, 3) + " " + ampm;


    return time; // RETURNS 12 HOUR TIME
}
export function showList(arr) {
    return arr.map(event => {
      return <TouchableOpacity key={event.id} onPress={() => this.props.navigation.navigate('EventView', { 
                                        id: event.id, name: event.name,  location: event.location, description: event.description,
                                        etime: event.etime, maxslots: event.maxslots, slots: event.slots, edate: event.edate,
                                        lastPage: 'ViewMyEvents'
                                        })}>
      <View style={styles.event} >
        <Text style={styles.title}>{event.name}</Text>
        <Text style={styles.location}>{event.edate.slice(0, 10)}</Text>
        <Text style={styles.location}>{event.location} at {MilToCil(event.etime)}</Text>
        <Text style={styles.description}>{event.description.length > 50 ? event.description.slice(0,50) + "..." : event.description}</Text>
        <ProgressBar visible={event.maxslots > 0 ? true : false} progress={event.slots/event.maxslots} color={Colors.orange800} />
      </View>
      </TouchableOpacity>
    })
  }