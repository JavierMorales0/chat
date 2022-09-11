import { Button } from 'primereact/button';

const BackButton = ({ onDisconnect }) => {
  return (
    <Button
      className="p-button-rounded p-button-text"
      icon="pi pi-chevron-left"
      onClick={onDisconnect}
      tooltip="Get back and disconnect"
      tooltipOptions={{ position: 'right' }}
      style={{ width: '32px', height: '32px' }}
    />
  );
};

export default BackButton;
