import React from "react";
import { storiesOf } from "@storybook/react-native";
import { StyleSheet } from "react-native";
import EventList from '@/src/components/guest/eventList'
import profileDefault from '@/assets/images/unnamed.png';

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
        <EventList data={events} btnText='Join'/>
    ));

const styles = StyleSheet.create({

});
