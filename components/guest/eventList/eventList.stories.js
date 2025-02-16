import React from "react";
import { storiesOf } from "@storybook/react-native";
import { StyleSheet } from "react-native";
import EventList from '@/components/guest/eventList'

const events = [
    {
        img: '',
        name: 'Aula de surf',
        people: [
            { avatar: profileDefault },
            { avatar: profileDefault },
            { avatar: profileDefault },
            { avatar: profileDefault },
        ],
        imgs: ['', ''],
        date: 'HOJE'
    },
    {
        img: '',
        name: 'Aula de surf',
        people: [
            { avatar: profileDefault },
            { avatar: profileDefault },
            { avatar: profileDefault },
            { avatar: profileDefault },
        ],
        imgs: ['', ''],
        date: 'HOJE'
    },
]

storiesOf("components/eventList", module)
    .add("Default", () => (
        <EventList data={events} btnText='Join'  title="Eventos perto de você"/>
    ));

const styles = StyleSheet.create({

});
