import { useEffect, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

export default function AutocompleteBox({ panTo }) {
  const [address, setAddress] = useState("");
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      // Define search scope to the Toronto region
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000, // 100km
    },
  });

  useEffect(() => {
    if (window.google && window.google.maps) {
      setAddress(value);
    }
  }, [value]);

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="autocomplete">
      <Combobox
        onSelect={handleSelect}
        aria-labelledby="search-label"
        className="combobox"
      >
        <ComboboxInput
          value={address}
          onChange={(e) => {
            setValue(e.target.value);
            setAddress(e.target.value);
          }}
          disabled={!ready}
          placeholder="Enter an address"
          aria-label="search"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
