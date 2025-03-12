import DaumPostcode from "react-daum-postcode";

import styles from "./addressSearch.module.scss";

import type { Address } from "react-daum-postcode";

import { IoClose } from "react-icons/io5";

interface AddressSearchProps {
  onChange: (address: { address: string; zonecode: string }) => void;
  handleComplete: () => void;
}

export default function AddressSearch({ onChange, handleComplete }: AddressSearchProps) {
  const complete = (data: Address) => {
    const extraAddress = [data.bname !== "" ? data.bname : "", data.buildingName !== "" ? data.buildingName : ""]
      .filter(Boolean)
      .join(", ");

    const fullAddress = extraAddress ? `${data.address} (${extraAddress})` : data.address;
    const zonecode = data.zonecode;
    onChange({
      address: fullAddress,
      zonecode: zonecode,
    });

    handleComplete();
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>주소 검색</h1>
          <IoClose size={30} color="white" onClick={handleComplete} />
        </div>
        <DaumPostcode autoClose className={styles.postcode} onComplete={complete} />
      </div>
    </div>
  );
}
