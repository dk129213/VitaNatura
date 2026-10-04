// Photos from Wikimedia Commons. CC BY / CC BY-SA require attribution.
const c = (file: string, title: string, author: string, license: string, page: string) => ({
  file,
  title,
  author,
  license,
  url: `https://commons.wikimedia.org/wiki/File:${page}`,
});

export const photoCredits = [
  c("dubrovnik-walls.jpg", "Casco viejo de Dubrovnik, 2014-04-14, DD 07", "Diego Delso", "CC BY-SA 3.0", "Casco_viejo_de_Dubrovnik,_Croacia,_2014-04-14,_DD_07.JPG"),
  c("dubrovnik.jpg", "Dubrovnik Old Town 1", "kallerna", "CC BY-SA 4.0", "Dubrovnik_Old_Town_1.jpg"),
  c("lapad.jpg", "Lapad Beach at sunset, Dubrovnik", "Jules Verne Times Two", "CC BY 4.0", "Lapad_Beach_at_sunset,_Dubrovnik,_Croatia,_(PPL2-Enhanced)_julesvernex2.jpg"),
  c("bus.jpg", "Bus to Dubrovnik", "Hibasi", "CC BY-SA 4.0", "Bus_to_Dubrovnik.jpg"),
  c("plane.jpg", "Croatia Airlines 9A-CQF at Zagreb Airport", "07", "CC BY-SA 4.0", "Croatia_Airlines_9A-CQF_at_Zagreb_Airport.jpg"),
  c("vela-luka.jpg", "Vela Luka, Island of Korčula", "Liilia Moroz", "CC BY-SA 4.0", "Vela_Luka_Island_of_Kor%C4%8Dula.jpg"),
  c("lokrum.jpg", "Lokrum Island, botanical garden", "Pudelek (Marcin Szala)", "CC BY-SA 3.0", "Lokrum_Island_-_botanical_garden.JPG"),
  c("mljet-lake-road.jpg", "Road along the lake Veliko Jezero on Mljet", "dronepicr", "CC BY 2.0", "Road_along_the_lake_Veliko_Jezero_on_Mljet,_Croatia_(48739047462).jpg"),
  c("spa.jpg", "Istarske Toplice, spa resort", "Dguendel", "CC BY 3.0", "Istarske_Toplice,_spa_resort,_image_2.jpg"),
  c("thalasso-opatija.jpg", "Thalassotherapia, Opatija", "Zoran Kurelić Rabko", "CC BY-SA 3.0", "THALASSOTHERAPIA,_Opatija_-_panoramio.jpg"),
  c("varazdinske-toplice.jpg", "Varaždinske Toplice", "Fraxinus", "CC BY-SA 3.0", "Varazdinske_Toplice.jpg"),
  c("mandarins.jpg", "Mandarins in my garden", "SKas", "CC BY-SA 4.0", "Mandarins_in_my_Garden_Sochi.JPG"),
  c("neretva.jpg", "Delta Neretvy, 2013", "Draceane", "CC BY-SA 4.0", "Delta_Neretvy,_2013_(01).jpg"),
  c("grapes.jpg", "Grape harvest, la vendemmia", "Anna.Massini", "CC BY 4.0", "Grape_harvest_-_La_vendemmia.jpg"),
  c("olives.jpg", "Raccolta olive, olive in cassetta", "Anna.Massini", "CC BY-SA 4.0", "Tradizioni_familiari_Raccolta_olive_wlk_olive_in_cassetta.jpg"),
];
