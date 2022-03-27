import { useCallback, useRef } from "react";
import "./App.scss";
import "react-reflex/styles.css";
import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";

import Map from "./Map";
import RequestsTable from "./Table";

function App() {
  const mapRef = useRef<L.Map>(null);
  console.log("render App");
  const onMapContainerResize = useCallback(() => {
    mapRef.current?.invalidateSize();
  }, []);

  return (
    <ReflexContainer orientation="vertical" className="app-container">
      <ReflexElement className="left-pane" minSize={300} flex={0.6}>
        <RequestsTable />
      </ReflexElement>

      <ReflexSplitter />

      <ReflexElement className="right-pane" minSize={500} onResize={onMapContainerResize}>
        <Map doubleClickZoom={false} zoom={9} center={[55.75, 37.57]} ref={mapRef} />
      </ReflexElement>
    </ReflexContainer>
  );
}
export default App;
