import { Animated, FlatList, SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import IntroductionItems from "@/components/introductionItems";

import GuestImg1 from '@/assets/images/illustrations/undraw/dating.svg'
import GuestImg2 from '@/assets/images/illustrations/undraw/drinking.svg'
import GuestImg3 from '@/assets/images/illustrations/undraw/house.svg'
import HostImg1 from '@/assets/images/illustrations/undraw/resume.svg'
import HostImg2 from '@/assets/images/illustrations/undraw/interview.svg'
import HostImg3 from '@/assets/images/illustrations/undraw/todo.svg'
import HostImg4 from '@/assets/images/illustrations/undraw/talking.svg'

import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n'
import Paginator from "@/components/paginator";

function IntroductionScreen() {
    const { role } = useLocalSearchParams();
    const { t, i18n } = useTranslation();

    const [currentIndex, setCurrentIndex] = useState()
    const scrollX = useRef(new Animated.Value(0)).current

    const guestFuncionalities = [
        {
            id: '1',
            img: <GuestImg1 width={380} height={380} />,
            title: t('Conecte-se com viajantes hospedados com você'),
            description: t('Veja os perfis dos hóspedes que estão hospedados com você, curta e habilite o chat quando eles te curtirem de volta'),
        },
        {
            id: '2',
            img: <GuestImg2 width={270} height={400} />,
            title: t('Sugira e participe de eventos no hotel ou na cidade'),
            description: t('Descubra eventos criados por outros hóspedes ou pelo hostel e participe de experiências únicas.'),
        },
        {
            id: '3',
            img: <GuestImg3 width={350} height={380} />,
            title: t('Hospede-se em qualquer lugar do mundo sem pagar nada!'),
            description: t('Troque serviços por hospedagens em qualquer lugar do mundo e aprimore suas habilidades e experiências.'),
        },
    ];

    const hostFuncionalities = [
        {
            id: '1',
            img: <HostImg1 width={300} height={300} />,
            title: t('Check-in rápido e seguro'),
            description: t('Realize checkins de forma eficiente validando passaportes ou documentos de identidade enviados pelos hóspedes garantindo segurança e agilidade.'),
        },
        {
            id: '2',
            img: <HostImg2 width={300} height={300} />,
            title: t('Publique e gerencie oportunidades de voluntariado'),
            description: t('Anuncie vagas para serviços que você precisa, em troca de hospedagem, e simplifique o processo de seleção e aprovação diretamente pelo app.'),
        },
        {
            id: '3',
            img: <HostImg3 width={300} height={300} />,
            title: t('Gerencie e acompanhe o progresso das tarefas de funcionários'),
            description: t('Atribua e monitore o status das tarefas em andamento ou concluídas e confira fotos como prova de execução.'),
        },
        {
            id: '4',
            img: <HostImg4 width={300} height={300} />,
            title: t('Atribua quartos aos hóspedes'),
            description: t('Organize a alocação de quartos de forma eficiente e rápida.'),
        },
    ];

    const viewableItemsChanged = useRef(({ viewbleItems }) => {
        setCurrentIndex(viewbleItems[0]?.index)
    })

    // const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const slideRef = useRef(null)

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark-content" />
            <View style={{ flex: 3 }}>
                <FlatList
                    data={role === "guest" ? guestFuncionalities : hostFuncionalities}
                    renderItem={({ item }) => (
                        <IntroductionItems item={item} />
                    )}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false
                    })}
                    scrollEventThrottle={32}
                    // onViewableItemsChanged={viewableItemsChanged}
                    // viewabilityConfig={viewConfig}
                    ref={slideRef}
                />
            </View>
            <Paginator
                data={role === "guest" ? guestFuncionalities : hostFuncionalities}
                scrollX={scrollX}
            />
        </SafeAreaView>
    );
}

export default IntroductionScreen;

const styles = StyleSheet.create({
    container: {
        height: '100%',
    }
})