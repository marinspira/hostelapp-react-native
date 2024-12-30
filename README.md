# Welcome to your Expo app 👋
This is an [Expo](https://expo.dev) project created with [`create-expo-app`]

## Get started
1. Install dependencies
   npm install

2. Start the app
    npx expo start

3. Open on a android simulator
   npm run android

## Get a fresh project
When you're ready, run:
   npm run reset-project


# Checkin configurações
-- O guest é criado no banco antes do checkin ser enviado com a data de nascimento nas situações:
1. Ele loga com o Google e possui foto de perfil, então o guest é criado com o item guestPhotos e a foto do Google
2. Ele adiciona uma foto de perfil na parte de checkin

-- O valor isNewGuest só atualiza após ele enviar o form de checkin


# Uso do tema
Como utilizar o tema centralizado na sua aplicação React Native usando o hook useTheme. Esse hook retorna estilos dinâmicos baseados no tema atual armazenado no estado global (Redux).

Estrutura
O arquivo principal do hook, useThemeColors.ts, contém a lógica para acessar o estado global do tema e retornar os estilos baseados em Colors.

Definição do Hook
   [`@/hooks/useThemeColors.ts`]

## Como Usar o Hook
1. Importar o Hook
Certifique-se de importar o useTheme no componente onde deseja aplicar estilos dinâmicos.
   [`import { useTheme } from '@/hook/useThemeColors'`]

2. Obter os Estilos Dinâmicos
Chame o hook dentro do componente para acessar os estilos baseados no tema.

  [`const dynamicStyles = useTheme();`]

3. Aplicar Estilos
Use os estilos retornados pelo hook diretamente nos componentes.

   <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.text}>Este texto segue o tema atual.</Text>
   </View>