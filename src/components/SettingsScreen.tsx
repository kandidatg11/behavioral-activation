import React, { useEffect } from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { Button, IconButton, Menu, Surface, Text } from 'react-native-paper';

import Storage from 'storage';
import { languages } from 'language';
import { useTranslation } from 'language/LanguageProvider';
import { IconList } from './IconList';

const NotificationSwitch = () => {
  const [settings, modifySettings] = Storage.useSettings();
  return  (
    <Switch
        trackColor={{false: 'gray', true: 'teal'}}
        thumbColor="white"
        ios_backgroundColor="gray"
        onValueChange={(value) => modifySettings.setNotifications(value)}
        value={settings.notifications}
      />
  );
}

const LanguageMenu = () => {
  const [settings, modifySettings] = Storage.useSettings()
  const dict = useTranslation();

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>{dict.languageName}</Button>}>
          {Object.keys(languages).map((language, index) => 
            <Menu.Item
              onPress={() => {
                modifySettings.setLanguage(language);
                closeMenu();
              }}
              title={languages[language].languageName}
              key={index}/>
          )}
      </Menu>
    </View>
  );
}

const IconCustomizer = () => {
  const dict = useTranslation();
  const [visible, setVisible] = React.useState(false);
  const [selected, setSelected] = React.useState<number|null>(null);
  const [icons, modifyIcons] = Storage.useIcons();

  const callback = (index: number, icon: string) => {
    if (selected == null) {
      setSelected(index);
    } else {
      modifyIcons.swap(selected, index);
      setSelected(null);
    }
  }

  const setVisible2 = (v: boolean) => {
    if (!v) {
      setSelected(null);
    }
    setVisible(v);
  }

  return (
    <>
      <Button onPress={() => setVisible(true)}>
        {dict["settingsSurfaceIconCustomize"]}
      </Button>
      <IconList
        startIndex={0}
        selectedIndex={selected}
        pressCallback={callback}
        setVisible={setVisible2}
        visible={visible}
      />
    </>
  );
}

const IconWithText: React.FC<{icon: string, text: string}> = ({icon, text}) => {
  return (
    <View style={styles.iconWithText}>
      <IconButton icon={icon}/>
      <Text>{text}</Text>
    </View>
  );
}

export const SettingsScreen = () => {
  const dict = useTranslation();
  return (
    <View>
      <Surface style={styles.surface}>
        <IconWithText icon="translate" text={dict["settingsSurfaceLanguage"]} />
        <LanguageMenu />
      </Surface>
      <Surface style={styles.surface}>
        <IconWithText icon="bell" text={dict["settingsSurfaceNotifications"]} />
        <NotificationSwitch />
      </Surface>
      <Surface style={styles.surface}>
        <IconWithText icon="apps" text={dict["settingsSurfaceIcons"]} />
        <IconCustomizer />
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  surface: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 20,
    borderRadius: 5,
    marginBottom: 0,
  },
  iconWithText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
})
