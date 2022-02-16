import { useState } from 'react';

import { SuccessModel, Form } from 'components';

const App = () => {
  const [showModel, setShowModel] = useState<boolean>(false);

  const handleShowModel = () =>
    setShowModel((prevState: boolean) => !prevState);

  return (
    <>
      {showModel ? <SuccessModel onClick={handleShowModel} /> : undefined}
      <Form onSubmitForm={handleShowModel} />
    </>
  );
};

export default App;
