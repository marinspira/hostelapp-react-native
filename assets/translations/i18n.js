import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        lng: 'en', // Idioma padrão
        resources: {
            en: {
                translation: {
                    'Olá': 'Hello, {{name}} 👋🏼',
                    'Converse com quem está hospedado com você': 'Chat with who is staying with you',
                    'Eventos perto de você': 'Events near you',
                    'Seu nome': 'Your name',
                    'Seu aniversário': 'Your birthday*',
                    'De onde você é?': 'Where are you from?*',
                    'Selecione uma opção': 'Select an option',
                    'Foto do seu Passaporte/Identidade': 'Passaport/ID photo',
                    'Apenas a administração do hotel pode ver essa informação': 'Only the hostel administration can see this information',
                    'Descrição': 'Description',
                    'Deixe seus colegas de quarto conhecerem você!': 'Let your rommates get know you!',
                    'Interesses': 'Interests',
                    'select_options': 'Select up to {{number}} options',
                    'TI': '💻 TI',
                    'Livros': '📖 Books',
                    'Fotografia': '📸 Photograph',
                    'Moda': '👗 Fashion',
                    'Filmes': '🎥 Movies',
                    'Futebol': '⚽ Football',
                    'Jogos': '🎮 Games',
                    'Veganismo': '🥗 Veg Food',
                    'Trilhas': '👟 Hikings',
                    'Quais idiomas você fala?': 'Which languages do you speak?',
                    'Você é nômade digital?': 'Are you a digital nomad?',
                    'Você trabalha online enquanto viaja?': 'Do you work online while travel?',
                    'Sim': 'Yes',
                    'Não': 'No',
                    'Você fuma?': 'Do you smoke?',
                    'Você está viajando com o seu animal de estimação?': 'Are you travelling with your pet?',
                    'Área do funcionário': 'Staff Area',
                    'Recepção': 'Reception',
                    'Limpeza': 'Housekeeping',
                    'Assistente de cozinha': 'Kitchen Assistant',
                    'Jardinagem': 'Gardener',
                    'Babá': 'Baby-Sitter',
                    'Ensino de esportes': 'Sports Teaching',
                    'Cuidados de animais': 'Animal Care',
                    'Ensino de idiomas': 'Language Teaching',
                    'Construção': 'Building',
                    'Para onde você gostaria que fosse a sua próxima viagem?': 'Where are you planning your next trip?',
                    'Nós vamos sugerir você para os anfitriões desse lugar :)': 'We will suggest you to hosts in this place :)',
                    'Educação': 'Education',
                    'Exemplo: Graduado em Desenvolvimento de Software': 'Exemple: Software Development Degree',
                    'Experiências de trabalho': 'Work Experience',
                    'Experiências de viagem': 'Travel Experience',
                    'Você possui alguma restrição ou alergia?': 'Do you have any restrictions or allergies?',
                    'Liste aqui quaisquer restrições': 'List any restrictions here',
                    'Habilidades': 'Skills',
                    'Encontrar uma oportunidade': 'Find an work exchange',
                    'Começar como Host': 'Get Start as Host',
                    'Começar como Hóspede': 'Get Start as Guest',
                    'Seu passaporte para transformar a maneira de viajar': 'Your passport to transform the way of traveling! 🗺️',
                    'Conecte-se com outros viajantes, descubra eventos perto de você e troque serviços por hospedagens em qualquer lugar do mundo.': 'Connect with other travelers, discover events near you and exchange services for accommodation anywhere in the world.',
                    'Conecte-se e converse com viajantes hospedados com você': 'Connect and chat with travelers staying with you',
                    'Veja os perfis dos hóspedes que estão hospedados com você, curta e habilite o chat quando eles te curtirem de volta': 'See the profiles of guests who are staying with you, like them and enable chat when they like you back.',
                    'Sugira e participe de eventos no hotel ou na cidade': 'Suggest and participate in events and activities',
                    'Descubra eventos criados por outros hóspedes ou pelo hostel e participe de experiências únicas.': 'Discover events created by other guests or the hostel and participate in unique experiences.',
                    'Hospede-se em qualquer lugar do mundo sem pagar nada!': 'Stay anywhere in the world paying anything!',
                    'Troque serviços por hospedagens em qualquer lugar do mundo e aprimore suas habilidades e experiências.': 'Exchange services for accommodation anywhere in the world and improve your skills and experience.',
                    'Check-in rápido e seguro': 'Fast and secure check-in',
                    'Realize checkins de forma eficiente validando passaportes ou documentos de identidade enviados pelos hóspedes garantindo segurança e agilidade.': 'Perform check-ins efficiently by validating passports or identity documents sent by guests, ensuring security and agility.',
                    'Publique e gerencie oportunidades de voluntariado': 'Publish and manage volunteer opportunities',
                    'Anuncie vagas para serviços que você precisa, em troca de hospedagem, e simplifique o processo de seleção e aprovação diretamente pelo app.': 'Advertise vacancies for services you need, in exchange for accommodation, and simplify the selection and approval process directly through the app.',
                    'Gerencie e acompanhe o progresso das tarefas de funcionários': 'Manage and track employee task progress',
                    'Atribua e monitore o status das tarefas em andamento ou concluídas e confira fotos como prova de execução.': 'Assign and monitor the status of in-progress or completed tasks and check out photos for proof of execution.',
                    'Atribua quartos aos hóspedes': 'Assign rooms to guests',
                    'Organize a alocação de quartos de forma eficiente e rápida.': 'Arrange room allocation efficiently and quickly.',
                    'Sou host': 'I am a host',
                    'Sou hóspede': 'I am a guest',
                    'Próximo': 'Next',
                    'Começar': 'Get start',
                    'Esse campo é obrigatório': 'This field is required',
                    'Permitir que outros hóspedes vejam você? (Você só verá outros hóspedes se essa opção estiver ativada)': 'Allow other guests to see your profile? (You will only see other guests if this option is enabled)',
                    'Complete seu perfil': 'Complete your profile',
                    'Seu número de celular': 'Your phone number',
                    'Você só pode alterar esse campo uma vez. Necessário ser +16.': 'You can only change this field once. Must be +16.',
                    'Selecionar': 'Select',
                    'Você deve ser maior que 16 anos para prosseguir.': 'You must be over 16 to continue.',
                    'Formulário incompleto': 'Incomplete form',
                    'Por favor, preencha sua data de nascimento e origem.': 'Please fill in your date of birth and origin.',
                    'Enviado!': 'Sent!',
                    'Upload feito com sucesso.': 'Upload successfully completed.',
                    'Algum erro aconteceu!': 'Something went wrong!',
                    'Por favor, notifique seu bug nas configurações.': 'Please report your bug in the settings.',
                    'Mostre um pouco de você e suas aventuras': 'Show yourself and your adventures!',
                    'Ver perfil': 'View profile',
                    'Suas viagens': 'Your trips',
                    'Relembre os lugares por onde você passou': 'Remember the places you have visited',
                    'Reviews': 'Reviews',
                    'Veja o que seus hosts falaram sobre você': 'See what your hosts have said about you',
                    'Configurar assinatura': 'Manage subscription',
                    'Gerencie sua assinatura, planos e pagamentos': 'Manage your subscription, plans, and payments',
                    'Como isso funciona': 'How it works',
                    'Saiba mais sobre o funcionamento do aplicativo e seus recursos': 'Learn more about how the app works and its features',
                    'Suporte': 'Support',
                    'Fale com nossa equipe de suporte para ajuda e dúvidas': 'Contact our support team for help and questions',
                    'Reportar problema ou sugerir melhoria': 'Report an issue or suggest an improvement',
                    'Encontrou algo que não está funcionando ou tem uma ideia para melhorar? Envie seu feedback aqui': 'Found something that is not working or have an idea for improvement? Submit your feedback here',
                    'Politicas e privacidade': 'Policies and privacy',
                    'Conheça nossas políticas de privacidade e como seus dados são tratados': 'Learn about our privacy policies and how your data is handled',
                    'Data inválida': 'Invalid dates',
                    'Data muito futura': 'Date too future',
                    'Data muito antiga': 'Date too old',
                    'Data de checkout precisa ser pelo menos 1 dia após o check-in': 'Checkout date needs to be at least one day after checkin',
                    "Reserva criada com sucesso!": "Reservation created succefully",
                    "Nenhum quarto encontrado": "No rooms found",
                    "Clique no botão + para criar": "Click the + button to create",
                    "Vazio por aqui. Toque para criar.": "It's empty here. Tap to create.",
                    "Quartos": "Rooms",
                    "Últimos eventos": "Last events",
                    "Hóspedes": "Guests",
                    "Nome do seu hostel": "Your hostel name",
                    "Qual endereço do seu hostel?": "What is your hostel's address?",
                    "CEP": "ZIP code",
                    "Endereço": "Street address",
                    "Cidade": "City",
                    "País": "Country",
                    "Como podemos entrar em contato com você?": "How can we contact you?",
                    "Seu número de celular": "Your phone number",
                    "E-mail do seu hostel": "Your hostel's e-mail",
                    "Telefone do seu hostel": "Your hostel's phone",
                    "Só mais algumas informações...": "Just a few more details...",
                    "Qual é o site do seu hostel?": "What is your hostel's website?",
                    "Você já teve voluntários antes?": "Have you had volunteers before?",
                    "Ao continuar você concorda com as políticas de privacidade e cookies.": "By continuing, you agree to the privacy and cookie policies.",
                    "Criar hostel": "Create hostel",
                    "Registre seu Hostel": "Register your Hostel",
                    "O nome do hostel é obrigatório": "The hostel name is required",
                    "CEP inválido": "Invalid ZIP code",
                    "Endereço obrigatório": "Address is required",
                    "Cidade obrigatória": "City is required",
                    "País obrigatório": "Country is required",
                    "O site é obrigatório": "Website is required",
                    "URL inválida": "Invalid URL",
                    "Escolha pelo menos uma opção": "Choose at least one option",
                    "Você deve aceitar as políticas de privacidade": "You must accept the privacy policy",
                    "Clique aqui para criar um quarto": "Click here to create a room",
                    "Nome do quarto": "Room's name",
                    "Quantas camas?": "How many beds?",
                    "Criar quarto": "Create room",
                    "Tipo de habitação": "Room's type",
                    "Compartilhado": "Shared",
                    "Privado": "Private",
                    "Como você organiza suas camas?": "How do you ornanize the beds?",
                    "Por números": "By numbers",
                    "Por letras": "By letters",
                    "Criar novo quarto": "Create new room",
                    "O nome é obrigatório": "Name is required",
                    "A capacidade deve ser um número": "Capacity must be a number",
                    "A capacidade deve ser maior que zero": "Capacity must be greater than zero",
                    "Tipo é obrigatório": "Room type is required",
                    "Organização é obrigatória": "Bed organization is required",
                    "Quarto criado com sucesso!": "Room created successfully!",
                    "Sucesso": "Success",
                    "Erro desconhecido": "Unknow error",
                    "": "",
                    "": "",
                },
            },
            pt: {
                translation: {
                    "Olá": "Olá, {{name}} 👋🏼",
                    "Converse com quem está hospedado com você": "Converse com quem está hospedado com você",
                    "Eventos perto de você": "Eventos perto de você",
                    "Seu nome": "Seu nome",
                    "Seu aniversário": "Seu aniversário",
                    "De onde você é?": "De onde você é?",
                    "Selecione uma opção": "Selecione uma opção",
                    "Foto do seu Passaporte/Identidade": "Foto do seu Passaporte/Identidade",
                    "Apenas a administração do hotel pode ver essa informação": "Apenas a administração do hotel pode ver essa informação",
                    "Descrição": "Descrição",
                    "Deixe seus colegas de quarto conhecerem você!": "Deixe seus colegas de quarto conhecerem você!",
                    "Interesses": "Interesses",
                    "select_options": "Selecione até {{number}} opções",
                    "TI": "💻 TI",
                    "Livros": "📖 Livros",
                    "Fotografia": "📸 Fotografia",
                    "Moda": "👗 Moda",
                    "Filmes": "🎥 Filmes",
                    "Futebol": "⚽ Futebol",
                    "Jogos": "🎮 Jogos",
                    "Veganismo": "🥗 Comida Vegana",
                    "Trilhas": "👟 Trilhas",
                    "Quais idiomas você fala?": "Quais idiomas você fala?",
                    "Você é nômade digital?": "Você é nômade digital?",
                    "Você trabalha online enquanto viaja?": "Você trabalha online enquanto viaja?",
                    "Sim": "Sim",
                    "Não": "Não",
                    "Você fuma?": "Você fuma?",
                    "Você está viajando com o seu animal de estimação?": "Você está viajando com o seu animal de estimação?",
                    "Área do funcionário": "Área do funcionário",
                    "Recepção": "Recepção",
                    "Limpeza": "Limpeza",
                    "Assistente de cozinha": "Assistente de cozinha",
                    "Jardinagem": "Jardinagem",
                    "Babá": "Babá",
                    "Ensino de esportes": "Ensino de esportes",
                    "Cuidados de animais": "Cuidados de animais",
                    "Ensino de idiomas": "Ensino de idiomas",
                    "Construção": "Construção",
                    "Para onde você gostaria que fosse a sua próxima viagem?": "Para onde você gostaria que fosse a sua próxima viagem?",
                    "Nós vamos sugerir você para os anfitriões desse lugar :)": "Nós vamos sugerir você para os anfitriões desse lugar :)",
                    "Educação": "Educação",
                    "Exemplo: Graduado em Desenvolvimento de Software": "Exemplo: Graduado em Desenvolvimento de Software",
                    "Experiências de trabalho": "Experiências de trabalho",
                    "Experiências de viagem": "Experiências de viagem",
                    "Você possui alguma restrição ou alergia?": "Você possui alguma restrição ou alergia?",
                    "Liste aqui quaisquer restrições": "Liste aqui quaisquer restrições",
                    "Habilidades": "Habilidades",
                    "Encontrar uma oportunidade": "Encontrar uma oportunidade"
                }
            },
            es: {
                translation: {
                    "Olá": "Hola, {{name}} 👋🏼",
                    "Converse com quem está hospedado com você": "Habla con quienes están hospedados contigo",
                    "Eventos perto de você": "Eventos cerca de ti",
                    "Seu nome": "Tu nombre",
                    "Seu aniversário": "Tu cumpleaños",
                    "De onde você é?": "¿De dónde eres?",
                    "Selecione uma opção": "Selecciona una opción",
                    "Foto do seu Passaporte/Identidade": "Foto de tu pasaporte/identidad",
                    "Apenas a administração do hotel pode ver essa informação": "Solo la administración del hotel puede ver esta información",
                    "Descrição": "Descripción",
                    "Deixe seus colegas de quarto conhecerem você!": "¡Deja que tus compañeros de habitación te conozcan!",
                    "Interesses": "Intereses",
                    "select_options": "Selecciona hasta {{number}} opciones",
                    "TI": "💻 TI",
                    "Livros": "📖 Libros",
                    "Fotografia": "📸 Fotografía",
                    "Moda": "👗 Moda",
                    "Filmes": "🎥 Películas",
                    "Futebol": "⚽ Fútbol",
                    "Jogos": "🎮 Juegos",
                    "Veganismo": "🥗 Comida Vegana",
                    "Trilhas": "👟 Caminatas",
                    "Quais idiomas você fala?": "¿Qué idiomas hablas?",
                    "Você é nômade digital?": "¿Eres un nómada digital?",
                    "Você trabalha online enquanto viaja?": "¿Trabajas en línea mientras viajas?",
                    "Sim": "Sí",
                    "Não": "No",
                    "Você fuma?": "¿Fumas?",
                    "Você está viajando com o seu animal de estimação?": "¿Viajas con tu mascota?",
                    "Área do funcionário": "Área del empleado",
                    "Recepção": "Recepción",
                    "Limpeza": "Limpieza",
                    "Assistente de cozinha": "Asistente de cocina",
                    "Jardinagem": "Jardinería",
                    "Babá": "Niñera",
                    "Ensino de esportes": "Enseñanza de deportes",
                    "Cuidados de animais": "Cuidado de animales",
                    "Ensino de idiomas": "Enseñanza de idiomas",
                    "Construção": "Construcción",
                    "Para onde você gostaria que fosse a sua próxima viagem?": "¿A dónde te gustaría que fuera tu próximo viaje?",
                    "Nós vamos sugerir você para os anfitriões desse lugar :)": "Te sugeriremos a los anfitriones de ese lugar :)",
                    "Educação": "Educación",
                    "Exemplo: Graduado em Desenvolvimento de Software": "Ejemplo: Graduado en Desarrollo de Software",
                    "Experiências de trabalho": "Experiencias laborales",
                    "Experiências de viagem": "Experiencias de viaje",
                    "Você possui alguma restrição ou alergia?": "¿Tienes alguna restricción o alergia?",
                    "Liste aqui quaisquer restrições": "Lista aquí cualquier restricción",
                    "Habilidades": "Habilidades",
                    "Encontrar uma oportunidade": "Encontrar una oportunidad"
                }
            },
            fr: {
                translation: {
                    "Olá": "Bonjour, {{name}} 👋🏼",
                    "Converse com quem está hospedado com você": "Discutez avec ceux qui séjournent avec vous",
                    "Eventos perto de você": "Événements près de chez vous",
                    "Seu nome": "Votre nom",
                    "Seu aniversário": "Votre anniversaire",
                    "De onde você é?": "D'où venez-vous?",
                    "Selecione uma opção": "Sélectionnez une option",
                    "Foto do seu Passaporte/Identidade": "Photo de votre passeport/pièce d'identité",
                    "Apenas a administração do hotel pode ver essa informação": "Seule l'administration de l'hôtel peut voir cette information",
                    "Descrição": "Description",
                    "Deixe seus colegas de quarto conhecerem você!": "Faites-vous connaître de vos colocataires!",
                    "Interesses": "Intérêts",
                    "select_options": "Sélectionnez jusqu'à {{number}} options",
                    "TI": "💻 TI",
                    "Livros": "📖 Livres",
                    "Fotografia": "📸 Photographie",
                    "Moda": "👗 Mode",
                    "Filmes": "🎥 Films",
                    "Futebol": "⚽ Football",
                    "Jogos": "🎮 Jeux",
                    "Veganismo": "🥗 Cuisine végétalienne",
                    "Trilhas": "👟 Randonnées",
                    "Quais idiomas você fala?": "Quelles langues parlez-vous?",
                    "Você é nômade digital?": "Êtes-vous un nomade numérique?",
                    "Você trabalha online enquanto viaja?": "Travaillez-vous en ligne pendant vos voyages?",
                    "Sim": "Oui",
                    "Não": "Non",
                    "Você fuma?": "Fumez-vous?",
                    "Você está viajando com o seu animal de estimação?": "Voyagez-vous avec votre animal de compagnie?",
                    "Área do funcionário": "Personnel",
                    "Recepção": "Réception",
                    "Limpeza": "Service de nettoyage",
                    "Assistente de cozinha": "Assistant de cuisine",
                    "Jardinagem": "Jardinage",
                    "Babá": "Nounou",
                    "Ensino de esportes": "Enseignement des sports",
                    "Cuidados de animais": "Soins des animaux",
                    "Ensino de idiomas": "Enseignement des langues",
                    "Construção": "Construction",
                    "Para onde você gostaria que fosse a sua próxima viagem?": "Quelle est votre prochaine destination?",
                    "Nós vamos sugerir você para os anfitriões desse lugar :)": "Nous vous recommanderons aux hôtes de cet endroit :)",
                    "Educação": "Éducation",
                    "Exemplo: Graduado em Desenvolvimento de Software": "Exemple: Diplômé en développement logiciel",
                    "Experiências de trabalho": "Expériences professionnelles",
                    "Experiências de viagem": "Expériences de voyage",
                    "Você possui alguma restrição ou alergia?": "Avez-vous des restrictions ou des allergies?",
                    "Liste aqui quaisquer restrições": "Listez ici vos restrictions",
                    "Habilidades": "Compétences",
                    "Encontrar uma oportunidade": "Trouver une opportunité"
                }
            }
        },
        fallbackLng: 'en', // Idioma de fallback caso a tradução não exista
        react: {
            useSuspense: false,
        },
        interpolation: {
            escapeValue: false, // React já escapa os valores por padrão
        },
    });

export default i18n;
