import React, { useCallback, useState, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import api from '../../services/api';
import {
  Container, Header, BackButton, HeaderTitle, UserAvatar,
  ProvidersListContainer, ProvidersList, ProviderContainer,
  ProviderAvatar, ProviderName, Calendar, CalendarTitle, OpenDatePickerButton,
  OpenDatePickerButtonText,
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
  const [availabiliy, setAvailability] = useState<AvailabilityItem[]>([]);
  const { provider_id } = route.params as RouteParams;
  const [selectedProvider, setSelectedProvider] = useState(provider_id);
  const { user } = useAuth();
  const { goBack } = useNavigation();

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
    console.log({ date });
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (date) setAppointmentDate(date);
  }, []);

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
    </Container>
  );
};

export default CreateAppointment;
