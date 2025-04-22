import { useTheme } from "@/src/hooks/useTheme"
import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"

export default function EventStripeSettings() {

    const dynamicStyles = useTheme()
    const { t } = useTranslation()

    // TODO: deixar as taxas dinamicas de acordo com os paises e moedas
    return (
        <View style={{ gap: 5, marginBottom: 20 }}>
            <Text style={dynamicStyles.h3}> {t("Como funciona:")}</Text>
            <Text style={dynamicStyles.text}>1. O hóspede vê seu evento no app.</Text>
            <Text style={dynamicStyles.text}>2. Ele paga com Apple Pay ou cartão, direto pelo celular.</Text>
            <Text style={dynamicStyles.text}>3. O dinheiro vai direto para sua conta Stripe.</Text>
            <Text style={dynamicStyles.text}>4. Você pode sacar para sua conta bancária a qualquer momento.</Text>

            <View style={{ marginVertical: 25, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 }}>
                <View style={{ flexDirection: 'row', padding: 8, backgroundColor: '#f0f0f0' }}>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>{t("Descrição")}</Text>
                    <Text style={{ width: 100, fontWeight: 'bold', textAlign: 'right' }}>{t("Valor")}</Text>
                </View>

                <View style={{ flexDirection: 'row', padding: 8 }}>
                    <Text style={{ flex: 1 }}>{t("Valor do ingresso")}</Text>
                    <Text style={{ width: 100, textAlign: 'right' }}>R$50,00</Text>
                </View>

                <View style={{ flexDirection: 'row', padding: 8, backgroundColor: '#fafafa' }}>
                    <Text style={{ flex: 1 }}>{t("Taxa Stripe (3.99% + R$0,39)")}</Text>
                    <Text style={{ width: 100, textAlign: 'right' }}>R$2,63</Text>
                </View>

                <View style={{ flexDirection: 'row', padding: 8 }}>
                    <Text style={{ flex: 1 }}>{t("Taxa da plataforma (5%)")}</Text>
                    <Text style={{ width: 100, textAlign: 'right' }}>R$2,82</Text>
                </View>

                <View style={{ flexDirection: 'row', padding: 8, backgroundColor: '#fafafa' }}>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>{t("Total pago pelo hóspede")}</Text>
                    <Text style={{ width: 100, textAlign: 'right', fontWeight: 'bold' }}>R$56,56</Text>
                </View>

                <View style={{ flexDirection: 'row', padding: 8 }}>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>{t("Total recebido pelo hostel")}</Text>
                    <Text style={{ width: 100, textAlign: 'right', fontWeight: 'bold' }}>R$50,00</Text>
                </View>
            </View>
        </View>
    )
}