import { SafeAreaView, StyleSheet, View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { useLocalSearchParams, router } from "expo-router";
import GuestImg1 from '@/assets/images/illustrations/undraw/dating.svg'
import GuestImg2 from '@/assets/images/illustrations/undraw/drinking.svg'
import GuestImg3 from '@/assets/images/illustrations/undraw/house.svg'
import HostImg1 from '@/assets/images/illustrations/undraw/resume.svg'
import HostImg2 from '@/assets/images/illustrations/undraw/interview.svg'
import HostImg3 from '@/assets/images/illustrations/undraw/todo.svg'
import HostImg4 from '@/assets/images/illustrations/undraw/talking.svg'
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n'
import Slide from "@/src/components/slide";
import IntroductionItems from "@/src/components/introductionItems";
import ButtonWithIcon from '@/src/components/buttons/ButtonWithIcon'
import { Colors } from '@/src/constants/Colors'

function IntroductionScreen() {
    const { role } = useLocalSearchParams();
    const { t, i18n } = useTranslation();

    const guestFuncionalities = [
        {
            id: '1',
            img: <GuestImg1 width={380} height={380} />,
            title: t('Conecte-se e converse com viajantes hospedados com você'),
            description: t('Veja os perfis dos hóspedes que estão hospedados com você, curta e habilite o chat quando eles te curtirem de volta'),
        },
        {
            id: '2',
            img: <GuestImg2 width={270} height={380} />,
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
            img: <HostImg1 width={300} height={380} />,
            title: t('Check-in rápido e seguro'),
            description: t('Realize checkins de forma eficiente validando passaportes ou documentos de identidade enviados pelos hóspedes garantindo segurança e agilidade.'),
        },
        {
            id: '2',
            img: <HostImg2 width={300} height={400} />,
            title: t('Publique e gerencie oportunidades de voluntariado'),
            description: t('Anuncie vagas para serviços que você precisa, em troca de hospedagem, e simplifique o processo de seleção e aprovação diretamente pelo app.'),
        },
        {
            id: '3',
            img: <HostImg3 width={300} height={380} />,
            title: t('Gerencie e acompanhe o progresso das tarefas de funcionários'),
            description: t('Atribua e monitore o status das tarefas em andamento ou concluídas e confira fotos como prova de execução.'),
        },
        {
            id: '4',
            img: <HostImg4 width={300} height={320} />,
            title: t('Atribua quartos aos hóspedes'),
            description: t('Organize a alocação de quartos de forma eficiente e rápida.'),
        },
    ];

    const data = role === "guest" ? guestFuncionalities : hostFuncionalities;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <Slide data={data} component={(item) => <IntroductionItems item={item} />}
                renderButtons={(isLastSlide, handleNextSlide) => (
                    <>
                        {isLastSlide ? (
                            <ButtonWithIcon
                                text={t("Começar")}
                                onPress={role === "guest" ?
                                    () => { router.push('/public/login?role=guest'); }
                                    :
                                    () => { router.push('/public/login?role=host'); }
                                }
                                textColor="#fff"
                            />
                        ) : (
                            <ButtonWithIcon
                                text={t("Próximo")}
                                onPress={handleNextSlide}
                                textColor="#fff"
                            />
                        )}
                        <ButtonWithIcon
                            text={role === "guest" ? t("Sou host") : t("Sou hóspede")}
                            onPress={() => router.push("/public")}
                            backgroundColor="transparent"
                            textColor={Colors.light.tint}
                        />
                    </>
                )} />
        </SafeAreaView >
    );
}

export default IntroductionScreen;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    buttonsContainer: {
        padding: 20,
        gap: 10,
        height: '15%'
    },

});
