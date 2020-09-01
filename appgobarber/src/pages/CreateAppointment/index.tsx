import React, {
  useCallback, useState, useEffect, useMemo,
} from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, Alert } from 'react-native';
import { format } from 'date-fns';
import api from '../../services/api';
import {
  Container, Header, BackButton, HeaderTitle, UserAvatar,
  ProvidersListContainer, ProvidersList, ProviderContainer,
  ProviderAvatar, ProviderName, Calendar, CalendarTitle, OpenDatePickerButton,
  OpenDatePickerButtonText, Title, Section, SectionContent, SectionTitle, Schedule, Hour, HourText,
  Content, CreateAppointmentButton, CreateAppointmentButtonText,
} from './styles';
import { useAuth } from '../../hooks/auth';

interface RouteParams {
  provider_id: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const route = useRoute();
  const [providers, setProviders] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const { provider_id } = route.params as RouteParams;
  const [selectedProvider, setSelectedProvider] = useState(provider_id);
  const { user } = useAuth();
  const { goBack, navigate } = useNavigation();

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSelectProvider = useCallback((id: string) => {
    setSelectedProvider(id);
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((state) => !state);
  }, []);

  const handleDateChange = useCallback((_: Event, date: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (date) setAppointmentDate(date);
  }, []);

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const morningAvailability = useMemo(() => availability
    .filter(({ hour }) => hour < 12)
    .map(({ hour, available }) => ({
      hour,
      hourFormatted: format(new Date().setHours(hour), 'HH:00'),
      available,
    })), [availability]);

  const afternoonAvailability = useMemo(() => availability
    .filter(({ hour }) => hour >= 12)
    .map(({ hour, available }) => ({
      hour,
      hourFormatted: format(new Date().setHours(hour), 'HH:00'),
      available,
    })), [availability]);

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(appointmentDate);
      date.setHours(selectedHour);
      date.setMinutes(0);
      date.setSeconds(0);

      const formattedDate = format(date, "yyy'-'MM'-'dd' 'HH:mm:ss'");
      await api.post('appointments', {
        provider_id: selectedProvider,
        date: formattedDate,
      });
      navigate('AppointmentCreated', {
        date: date.getTime(),
      });
    } catch (error) {
      Alert.alert(
        'Erro ao criar agendamento',
        'Ocorreu um erro ao tentar criar o agendamento, tente novamente',
      );
    }
  }, [appointmentDate, navigate, selectedHour, selectedProvider]);

  useEffect(() => {
    const year = appointmentDate.getFullYear();
    const month = appointmentDate.getMonth() + 1;
    const day = appointmentDate.getDate();
    api.get(`/providers/${selectedProvider}/day-availability`, {
      params: {
        year,
        month,
        day,
      },
    }).then((response) => setAvailability(response.data));
  }, [appointmentDate, selectedProvider]);

  useEffect(() => {
    api.get('/providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>
      <Content>

        <ProvidersListContainer>
          <ProvidersList
            data={providers}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(provider) => provider.id}
            renderItem={({ item: provider }) => (
              <ProviderContainer
                selected={selectedProvider === provider.id}
                onPress={() => handleSelectProvider(provider.id)}
              >
                <ProviderAvatar source={{ uri: provider.avatar_url }} />
                <ProviderName
                  selected={selectedProvider === provider.id}
                >
                  {provider.name}

                </ProviderName>
              </ProviderContainer>
            )}
          />
        </ProvidersListContainer>
        <Calendar>
          <CalendarTitle>Escolha uma data</CalendarTitle>
          <OpenDatePickerButton onPress={handleToggleDatePicker}>
            <OpenDatePickerButtonText>Selecionar outra data</OpenDatePickerButtonText>
          </OpenDatePickerButton>

          {showDatePicker && (
            <DateTimePicker
              value={appointmentDate}
              mode="date"
              display="calendar"
              onChange={handleDateChange}
            />
          )}
        </Calendar>
        <Schedule>
          <Title>Escolha o horário</Title>
          <Section>
            <SectionTitle>Manhã</SectionTitle>
            <SectionContent>
              {morningAvailability.map(({ hour, hourFormatted, available }) => (
                <Hour
                  enabled={available}
                  selected={selectedHour === hour}
                  key={hourFormatted}
                  available={available}
                  onPress={() => handleSelectHour(hour)}
                >
                  <HourText selected={selectedHour === hour}>{hourFormatted}</HourText>
                </Hour>
              ))}

            </SectionContent>
          </Section>
          <Section>
            <SectionTitle>Tarde</SectionTitle>
            <SectionContent>
              {afternoonAvailability.map(({ hour, hourFormatted, available }) => (
                <Hour
                  enabled={available}
                  selected={selectedHour === hour}
                  key={hourFormatted}
                  available={available}
                  onPress={() => handleSelectHour(hour)}
                >
                  <HourText selected={selectedHour === hour}>{hourFormatted}</HourText>
                </Hour>
              ))}

            </SectionContent>
          </Section>
        </Schedule>
        <CreateAppointmentButton onPress={handleCreateAppointment}>
          <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
        </CreateAppointmentButton>
      </Content>
    </Container>
  );
};

export default CreateAppointment;
