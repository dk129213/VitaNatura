// Photos from Wikimedia Commons. CC BY / CC BY-SA require attribution.
const c = (file: string, title: string, author: string, license: string, page: string) => ({
  file,
  title,
  author,
  license,
  url: `https://commons.wikimedia.org/wiki/File:${page}`,
});

export const photoCredits = [
  c("lapad.jpg", "Lapad Beach at sunset, Dubrovnik", "Jules Verne Times Two", "CC BY 4.0", "Lapad_Beach_at_sunset,_Dubrovnik,_Croatia,_(PPL2-Enhanced)_julesvernex2.jpg"),
  c("elaphiti.jpg", "Swimming area at Šunj Beach on Lopud island", "dronepicr", "CC BY 2.0", "Swimming_area_at_Sunj_Beach_on_Lopud_island,_Croatia_(48613058146).jpg"),
  c("mljet-lake-road.jpg", "Road along the lake Veliko Jezero on Mljet", "dronepicr", "CC BY 2.0", "Road_along_the_lake_Veliko_Jezero_on_Mljet,_Croatia_(48739047462).jpg"),
  c("mandarins.jpg", "Mandarins in my garden", "SKas", "CC BY-SA 4.0", "Mandarins_in_my_Garden_Sochi.JPG"),
  c("neretva.jpg", "Delta Neretvy, 2013", "Draceane", "CC BY-SA 4.0", "Delta_Neretvy,_2013_(01).jpg"),
  c("olives.jpg", "Raccolta olive, olive in cassetta", "Anna.Massini", "CC BY-SA 4.0", "Tradizioni_familiari_Raccolta_olive_wlk_olive_in_cassetta.jpg"),
  c("opuzen-neretva.jpg", "Neretva at Opuzen", "croatiatipscom", "CC0", "Neretva_opuzen4.jpg"),
  c("ston-walls.jpg", "Fortifications at Ston 2", "Tony Hisgett", "CC BY 2.0", "Fortifications_at_Ston_2.jpg"),
  c("mali-ston.jpg", "Mali Ston, Croatia", "Jerrye and Roy Klotz MD", "CC BY-SA 3.0", "MALI_STON,_CROATIA.jpg"),
  c("konavle.jpg", "Ljuta watermill, Konavle", "YxMb", "CC0", "Ljuta_Watermill_-_Jul_2022.jpg"),
  c("trsteno.jpg", "Arboretum Trsteno", "Pudelek (Marcin Szala)", "CC BY-SA 3.0", "Arboretum_Trsteno_(by_Pudelek).JPG"),
  c("neretva-birds.jpg", "Grey heron (siva čaplja)", "Ljeto", "CC BY-SA 4.0", "Siva_caplja_C196940.jpg"),
];
