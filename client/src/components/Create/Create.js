import React, { useState } from "react";
import { db } from "../../firebase/firebase";

const CreateOffer = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("offers")
      .add({
        name: name,
        description: description,
        image: image,
      })
      .then(() => {
        alert("Created!");
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });

    setName("");
    setDescription("");
    setImage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create New Offer</h1>

      <label>Company Name</label>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Description</label>
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label>Image</label>
      <textarea
        placeholder="Image"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></textarea>

      <button
        type="submit"
        style={{ background: loader ? "#ccc" : "rgb(2,2,110" }}
      >
        Create
      </button>
    </form>
  );
};

export default CreateOffer;
