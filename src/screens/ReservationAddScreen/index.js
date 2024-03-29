import React, { useState, useEffect, useRef } from 'react';
import C from './style';
import api from '../../services/api';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useStateValue } from '../../contexts/StateContext';
import CalendarPicker from 'react-native-calendar-picker';

export default () => {
  const scroll = useRef();
  const navigation = useNavigation();
  const route = useRoute();
  const [context, dispatch] = useStateValue();

  const [loading, setLoading] = useState(true);
  const [disabledDates, setDisabledDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeList, setTimeList] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.setOptions({
        headerTitle: `Reservar ${route.params.data.title}`,
      });
      getDisabledDates();
    });
    return unsubscribe;
  }, [navigation, route]);

  useEffect(() => {
    getTimes();
  }, [selectedDate]);

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  const getTimes = async () => {
    if (selectedDate) {
      const result = await api.getReservationTimes(
        route.params.data.id,
        selectedDate
      );

      if (result.error === '') {
        setSelectedTime(null);
        setTimeList(result.list);
        setTimeout(() => {
          scroll.current.scrollToEnd();
        }, 500);
      } else {
        alert(result.error);
      }
    }
  };

  const getDisabledDates = async () => {
    setDisabledDates([]);
    setTimeList([]);
    setSelectedDate(null);
    setSelectedTime(null);
    setLoading(true);
    const result = await api.getDisableDates(route.params.data.id);
    setLoading(false);
    if (result.error === '') {
      let dateList = [];
      for (let i in result.list) {
        dateList.push(new Date(result.list[i]));
      }
      setDisabledDates(dateList);
    } else {
      alert(result.error);
    }
  };

  const handleDateChange = (date) => {
    let dateEl = new Date(date);
    let year = dateEl.getFullYear();
    let month = dateEl.getMonth() + 1;
    let day = dateEl.getDate();
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    setSelectedDate(`${year}-${month}-${day}`);
  };

  const showTextDate = (date) => {
    let dateEl = new Date(date);
    let year = dateEl.getFullYear();
    let month = dateEl.getMonth() + 1;
    let day = dateEl.getDate();
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    return `${day}/${month}/${year}`;
  };

  const handleSave = async () => {
    if (selectedDate && selectedTime) {
      const result = await api.setReservation(
        route.params.data.id,
        selectedDate,
        selectedTime
      );
      if (result.error === '') {
        navigation.navigate('ReservationMyScreen');
      } else {
        alert(result.error);
      }
    } else {
      alert('Selecione uma data e um horario');
    }
  };

  return (
    <C.Container>
      <C.Scroller ref={scroll} contentContainerStyle={{ paddingBottom: 40 }}>
        <C.CoverImage
          source={{ uri: route.params.data.image }}
          resizeMode="cover"
        />
        {loading && <C.LoadingIcon size="large" cor="#8863e6" />}
        {!loading && (
          <C.CalendarArea>
            <CalendarPicker
              onDateChange={handleDateChange}
              disabledDates={disabledDates}
              minDate={minDate}
              maxDate={maxDate}
              weekdays={['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']}
              months={[
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                ,
                'Novembro',
                'Dezembro',
              ]}
              previousTitle="Anterior"
              nextTitle="Próximo"
              selectDayColor="#8863e6"
              selectedDayTextColor="#fff"
              todayBackgroundColor="transparent"
              // todayTextStyle={{ color: '#8863e6' }}
              todayTextStyle="#000"
            />
          </C.CalendarArea>
        )}
        {!loading && selectedDate && (
          <>
            <C.Title>
              Horários disponiveis em {showTextDate(selectedDate)}:
            </C.Title>

            <C.TimeListArea>
              {timeList.map((item, index) => (
                <C.TimeItem
                  key={index}
                  onPress={() => setSelectedTime(item.id)}
                  active={selectedTime === item.id}
                >
                  <C.TimeItemText active={selectedTime === item.id}>
                    {item.title}
                  </C.TimeItemText>
                </C.TimeItem>
              ))}
            </C.TimeListArea>
          </>
        )}
      </C.Scroller>
      {!loading && (
        <C.ButtonArea onPress={handleSave}>
          <C.ButtonText>Reservar Local</C.ButtonText>
        </C.ButtonArea>
      )}
    </C.Container>
  );
};
