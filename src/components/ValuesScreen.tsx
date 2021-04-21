import React, {useEffect, useState} from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Title, Button, TextInput, FAB, IconButton, Surface, useTheme, Portal, Dialog, Paragraph} from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { CustomNavigationBar } from './CustomNavigationBar';
import { useTranslation } from 'language/LanguageProvider';
import Storage from 'storage';
import { ValuesTopic, People, ValuesEntry } from 'storage/types';
import { IconMeny } from './IconMeny';
import { IconList } from './IconList';
import { useLinkProps } from '@react-navigation/native';
 
const ValuesStack = createStackNavigator();

const RoundButton = (props: any) => {
  return (
    <Surface style={{ borderRadius: 100, elevation: 3}}>
      <IconButton icon={props.icon} size={props.size} onPress={props.onPress} />
    </Surface >
  );
  }
  const CircleButton = (props: any) => {
    return (
      <Surface style={{ borderRadius: 100, elevation: 3, backgroundColor: props.backgroundColor }}>
        <IconButton icon={props.icon} size={props.size} onPress={props.onPress} />
      </Surface >
    );
  }

//Button that deletes topics and persons
const DeleteTopicButton = (props: any) => {
  
  const [values, modifyValues] = Storage.useValues();
  const [people, modifyPeople] = Storage.usePeople();
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <Surface style={{ borderRadius: 100, elevation: 3}}>
      <IconButton icon={"close"} size={40} onPress={showDialog} />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Paragraph>Are you sure?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>
              CANCEL
            </Button>
            <Button onPress={()=> {
            modifyValues.deleteTopic(props.category, props.name);
    
            }}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Surface >

  )

}

const DeletePersonButton = (props: any) => {
  
  const [values, modifyValues] = Storage.useValues();
  const [people, modifyPeople] = Storage.usePeople();
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <Surface style={{ borderRadius: 100, elevation: 3}}>
      <IconButton icon={"close"} size={40} onPress={showDialog} />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Paragraph>Are you sure?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>
              CANCEL
            </Button>
            <Button onPress={()=> {
             modifyPeople.deletePerson(props.name);
            }}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Surface >

  )
}

const DeleteEntryButton = (props: any) => {
  const [values, modifyValues] = Storage.useValues();
  const [people, modifyPeople] = Storage.usePeople();
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <Surface style={{ borderRadius: 100, elevation: 3}}>
      <IconButton icon={"close"} size={40} onPress={showDialog} />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Paragraph>Are you sure?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>
            CANCEL
            </Button>
            <Button onPress={()=> {
              modifyValues.deleteEntry(props.category, props.name, props.entry);
            }}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Surface >

  )
}



//Template for buttons used
const StyledButton = (props: any) => {
  return (
    
      <Button theme={{ roundness: 30 }} contentStyle={{width: 240, height: 70}} compact={true} mode="outlined" onPress={props.categoryButton}>
        <Text>{props.name}</Text>
      </Button>
  )
}
const EntryButton = (props: any) => {
  return (
    
      <Button theme={{ roundness: 30 }} labelstyle={{fontSize: 100}}contentStyle={{width: 240, height: 70}} compact={true} mode="outlined" onPress={props.categoryButton} icon={props.icon}>
        <Text>{props.name}</Text>
      </Button>
  )
}


const addEntryView = ({route, navigation}: any) => {
  const [values, modifyValues] = Storage.useValues();
  const [text, setText] = React.useState('');
  const [people, modifyPeople] = Storage.usePeople();
  const { title, navigateBack, categoryString, icon } = route.params;
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.3, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
      <Surface style={{ borderRadius: 100, elevation: 3}}>
        <IconButton icon={icon} size={30} />
      </Surface > 
      <View style={{ width: 15, height: 15 }} />
        <Title style={{fontSize: 30}}>{title}</Title>
        
      </View>
      <View style={{flex: 0.2, justifyContent: 'center'}}>
      <TextInput
      value={text}
      onChangeText={setText}
      mode={"outlined"} 
      style={{flex: 0.5, paddingHorizontal: 50, justifyContent: 'flex-start', fontSize: 20}}
      placeholder={"Skriv här"}
      multiline={true}
    />
      </View>
      <View style={{ flex: 0.3, paddingBottom: 60, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-evenly'}}>
        <RoundButton icon="close" size={40} onPress={() => {
          navigation.navigate({
            name: 'EntryView'
          })
        }} />
        <RoundButton icon="check" size={40} onPress={() =>{
          navigation.navigate({
            name: 'EntryView',
          },);
          
            modifyValues.addEntry(categoryString, title, {
              icon: icon,
              text: text,
            })
          }}  />  
      </View>
     </View>
  )

}


const chooseEntryIconView = ({route, navigation}: any) => {
  const [visible, setVisible] = React.useState(false);
  const { colors } = useTheme();
  const {title, navigateBack, categoryString} = route.params;

  const iconPressCallback = (pressedIcon: Number, icon: String) => {
    navigation.navigate('addEntryView', {
      title: title,
      navigateBack: navigateBack,
      categoryString: categoryString,
      icon: icon,
    });
  };

  const iconListButton = () => {
    setVisible(true);
  };

  return(
    <View style={{flex: 1}}>
      <IconList pressCallback={iconPressCallback} visible={visible} setVisible={setVisible} />
      <IconMeny pressCallback={iconPressCallback} />

      <View style={{ paddingBottom: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
        <CircleButton icon='menu' size={40} backgroundColor={colors.accent} onPress={iconListButton} />
      </View>
    </View>

  )
}

const EntryView = ({route, navigation}: any) => {
  const {title, navigateBack, categoryString} = route.params;
  const [values, modifyValues] = Storage.useValues();
  let index: number;
  let category: any;

  useEffect(() => {
    content
  }, [values])

   switch(categoryString){
    case "relations":
      category = values.relations;
      break;
    case "work":
      category = values.work;
      break;
    case "health":
      category = values.health;
      break;
    case "enjoyment":
      category = values.enjoyment;
      break;
    case "responsibilities":
      category = values.responsibilities;
      break;
    //Category needs to be set to something
    default:
      category = values.relations;
  }
  index = values[categoryString].findIndex(t => t.name === title);
  console.log("entirers: ", category[index].entries)
  const content = category[index].entries.map((entry: ValuesEntry) => 
      <>
      <View style={{flex: 1, flexDirection: 'row'}}>
      <EntryButton name={entry.text} categoryButton={null} icon={entry.icon}/>
      <View style={{ width: 10, height: 10 }} />
      <DeleteEntryButton category= {categoryString} name={category[index].name} entry={entry}/>
      </View>
      <View style={{ width: 20, height: 20 }} />
      </> 
  );

  return(
    <View style={{ flex: 1}}>
    <View style={{flex: 0.14, justifyContent: 'center', alignItems: 'center'}}>
      <Title style={{fontSize: 30}}>{title}</Title>
    </View>
    <ScrollView style={{flex: 0.8}}>
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {content}
      </View>
    </ScrollView>
    <FAB
      style={{
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      }}
      icon="pencil"
      onPress={() => {
        navigation.navigate('chooseEntryIconView', {
          title: title,
          navigateBack: navigateBack,
          categoryString: categoryString
        });
      }}
    />
  </View>
  )
}

//View when adding a new topic
const TopicTextInputView = ({route, navigation}: any) => {
  const [values, modifyValues] = Storage.useValues();
  const [text, setText] = React.useState('');
  const [people, modifyPeople] = Storage.usePeople();
  const { title, navigateBack, categoryString } = route.params;
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
        <Title style={{fontSize: 30}}>{title}</Title>
      </View>
      <View style={{flex: 0.2, justifyContent: 'center'}}>
      <TextInput
      value={text}
      onChangeText={setText}
      mode={"outlined"} 
      style={{flex: 0.5, paddingHorizontal: 50, justifyContent: 'flex-start', fontSize: 20}}
      placeholder={"Skriv här"}
      multiline={true}
    />
      </View>
      <View style={{ flex: 0.3, paddingBottom: 60, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-evenly'}}>
        <RoundButton icon="close" size={40} onPress={() => {
          navigation.navigate({
            name: navigateBack
          })
        }} />
        <RoundButton icon="check" size={40} onPress={() =>{
          navigation.navigate({
            name: navigateBack,
          },);
          if(categoryString != 'people'){
            modifyValues.addTopic(categoryString, text);
          }
          else{
            modifyPeople.add(text);
          }

        } } />  
      </View>
     </View>
  )
}

//View for each topic
const TopicView = ({route, navigation}: any) => {
  const { title, navigateBack, categoryString} = route.params;
  const [values, modifyValues] = Storage.useValues();
  const [people, modifyPeople] = Storage.usePeople();

  let category: any;
  let buttonText: any;
  let content: any;
  
  //Create buttons to each topic whenever we add or delete a topic
  useEffect(() => {
    buttons
  }, [values])

  //Create text boxes to people whenever we add or delete a people
  useEffect(() => {
    textBoxes
  }, [people])

  //To find the right category
  switch(categoryString){
    case "relations":
      category = values.relations;
      break;
    case "work":
      category = values.work;
      break;
    case "health":
      category = values.health;
      break;
    case "enjoyment":
      category = values.enjoyment;
      break;
    case "responsibilities":
      category = values.responsibilities;
      break;
    case "people":
      category = people;
      break;
    //Category needs to be set to something
    default:
      category = values.relations;

  }
  //creates a list of buttons with the right topic in the right category
  const buttons = category.map((topic: ValuesTopic) => 
      <>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Button theme={{ roundness: 30 }} contentStyle={{width: 240, height: 70}} compact={true} mode="outlined" onPress={() => {
        navigation.navigate('EntryView', {
          title: topic.name,
          navigateBack: navigateBack,
          categoryString: categoryString
        });
      }}>
        <Text>{topic.name}</Text>
        </Button>
      <View style={{ width: 10, height: 10 }} />
      <DeleteTopicButton category= {categoryString} name={topic.name}/>
      </View>
      <View style={{ width: 20, height: 20 }} />
      
      </> 
  );

  //create a list of text boxes for people
  const textBoxes = category.map((person: People) =>    
  <>
  <View style={{flex: 1, flexDirection: 'row'}}>
  <StyledButton name={person} categoryButton={null}/>
  <View style={{ width: 10, height: 10 }} />
  <DeletePersonButton category= {categoryString} name={person}/>
  </View>
  <View style={{ width: 20, height: 20 }} />
  
  </> 
  );
    if(categoryString!='people'){
      content=buttons;
    }
    else{
      content=textBoxes;
    }
  return (
    <View style={{ flex: 1}}>
    <View style={{flex: 0.14, justifyContent: 'center', alignItems: 'center'}}>
      <Title style={{fontSize: 30}}>{title}</Title>
    </View>
    <ScrollView style={{flex: 0.8}}>
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {content}
      </View>
    </ScrollView>
    <FAB
      style={{
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      }}
      icon="pencil"
      onPress={() => {
        navigation.navigate('TopicTextInputView', {
          title: title,
          navigateBack: navigateBack,
          categoryString: categoryString,
        });
      }}
    />
  </View>
  );
}



 //View for the first screen in values 
const StartScreenView = ({navigation}: any) => {
  const lang = useTranslation();
  
  const relationsButton = () => {
    navigation.navigate('Relations', {
      title: lang.valuesButtonRelations,
      navigateBack: 'Relations',
      categoryString: 'relations',
    });
  };

  const workButton = () => {
    navigation.navigate('Work', {
      title: lang.valuesButtonWork,
      navigateBack: 'Work',
      categoryString: "work",
    });
  };

  const enjoymentButton = () => {
    navigation.navigate('Enjoyment', {
      title: lang.valuesButtonEnjoyment,
      navigateBack: 'Enjoyment',
      categoryString: 'enjoyment',
    });
  };

  const healthButton = () => {
    navigation.navigate('Health', {
      title: lang.valuesButtonHealth,
      navigateBack: 'Health',
      categoryString: 'health',
    });
  };

  const responsibilitiesButton = () => {
    navigation.navigate('Responsibilities', {
      title: lang.valuesButtonResponsibilities,
      navigateBack: 'Responsibilities',
      categoryString: 'responsibilities',
    });
  };

  const peopleButton = () => {
    navigation.navigate('People', {
      title: lang.valuesButtonPeople,
      navigateBack: 'People',
      categoryString: 'people',

    });
  };

  return (
    <View style={{flex: 1}}>
    <View style={{flex: 0.10, alignItems: 'center', justifyContent: 'center'}}>
      <Title>{lang.valuesHeaderEvaluation}</Title>
    </View>
    <View style={{flex: 0.14, alignItems: 'center', justifyContent: 'center'}}>
      <StyledButton name={lang.valuesButtonRelations} categoryButton={relationsButton}/>
    </View>
    <View style={{flex: 0.14, alignItems: 'center', justifyContent: 'center'}}>
      <StyledButton name={lang.valuesButtonWork} categoryButton={workButton}/>
    </View>
    <View style={{flex: 0.14, alignItems: 'center', justifyContent: 'center'}}>
      <StyledButton name={lang.valuesButtonEnjoyment} categoryButton={enjoymentButton}/>
    </View>
    <View style={{flex: 0.14, alignItems: 'center', justifyContent: 'center'}}>
      <StyledButton name={lang.valuesButtonHealth} categoryButton={healthButton}/>
    </View>
    <View style={{flex: 0.14, alignItems: 'center', justifyContent: 'center'}}>
      <StyledButton name={lang.valuesButtonResponsibilities} categoryButton={responsibilitiesButton}/>
    </View>
    <View style={{flex: 0.02, alignItems: 'center', justifyContent: 'center'}}>
    </View>
    <View style={{flex: 0.14, alignItems: 'center', justifyContent: 'center'}}>
      <StyledButton name={lang.valuesButtonPeople} categoryButton={peopleButton}/>
    </View>
  </View>
  )
}

export const ValuesScreen = () => {
  return (
    
    <ValuesStack.Navigator initialRouteName="Values" headerMode="float"
      screenOptions={{
        header: (props: any) => <CustomNavigationBar {...props} />,
      }}
    >
      <ValuesStack.Screen name="StartScreenView" component= {StartScreenView} />
      <ValuesStack.Screen name="Relations" component={TopicView} />
      <ValuesStack.Screen name="Work" component={TopicView} />
      <ValuesStack.Screen name="Enjoyment" component={TopicView} />
      <ValuesStack.Screen name="Health" component={TopicView} />
      <ValuesStack.Screen name="Responsibilities" component={TopicView} />
      <ValuesStack.Screen name="People" component={TopicView} />

      <ValuesStack.Screen name="TopicTextInputView" component={TopicTextInputView}/>
      <ValuesStack.Screen name="EntryView" component={EntryView}/>
      <ValuesStack.Screen name="chooseEntryIconView" component={chooseEntryIconView}/>
      <ValuesStack.Screen name="addEntryView" component={addEntryView}/>


    </ValuesStack.Navigator>
  );
}
