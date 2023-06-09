import React from "react";

import { useEffect, useState } from "react";
import solarImage from "../image/solar.png";
import Ev from "../image/car.png";
import battery from "../image/battery.png";
import load from "../image/load.png";
import grid from "../image/factory.png";
import {
  Card,
  CardBody,
  SimpleGrid,
  Heading,
  Image,
  Divider,
} from "@chakra-ui/react";

const Energy = (data) => {
  const [powerFlow, setPowerFlow] = useState([]);
  const [totalEnergy, setTotalEnergy] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/powerFlow.json");
        const data = await response.json();
        setPowerFlow(data.powerFlow);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let total = 0;
    powerFlow.forEach((resource) => {
      if (resource.value) {
        total += resource.value;
      }
    });
    setTotalEnergy(total);
  }, [powerFlow]);

  const getImage = (type) => {
    switch (type) {
      case "microgrid":
        return grid;
      case "solar":
        return solarImage;
      case "battery":
        return battery;
      case "ev":
        return Ev;
      case "load":
        return load;
      default:
        return null;
    }
  };
  // const result = powerFlow.filter((d) => d.label === "MICROGRID");
  // console.log(result);
  const updatedPowerFlow = powerFlow.map((resource) => {
    if (resource.label === "MICROGRID") {
      return { ...resource, value: totalEnergy };
    }
    return resource;
  });

  return (
    <div>
      <Heading fontFamily={"cursive"} textAlign={"center"} mt={"20px"}>
        My Energy App
      </Heading>
      <Divider colorScheme="facebook" size={"lg"}></Divider>
      <Heading textAlign={"center"} mt={"40px"} size={"md"} fontSize={"25px"}>
        Total Energy: {totalEnergy} kW
      </Heading>

      <SimpleGrid
        columns={3}
        spacing={10}
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        justifyItems={"center"}
      >
        {powerFlow.slice(1).map((resource, index) => (
          <Card
            justifyContent={"center"}
            alignContent={"center"}
            variant={"elevated"}
            border={"0.5px"}
            margin={"20px"}
          >
            <CardBody padding={"15px"} alignContent={"center"}>
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "150px" }}
                src={getImage(resource.type)}
                alt={""}
              />

              <Heading fontSize={"medium"} m={"10px"}>
                <span>{resource.label}:</span>
                <span>{resource.value} kW</span>
              </Heading>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {updatedPowerFlow.map((resource, index) => (
        <>
          <div key={index}>
            {resource.label === "MICROGRID" && (
              <>
                <Card
                  variant={"elevated"}
                  border={"0.5px"}
                  margin={"30px"}
                  size={"lg"}
                  alignItems={"center"}
                >
                  <CardBody padding={"15px"}>
                    <Image
                      objectFit="cover"
                      maxW={{ base: "100%", sm: "150px" }}
                      src={grid}
                      alt={""}
                    />

                    <Heading fontSize={"medium"} m={"10px"}>
                      <span>{resource.label}:</span>
                      <span>{resource.value} kW</span>
                    </Heading>
                  </CardBody>
                </Card>
              </>
            )}
          </div>
        </>
      ))}
    </div>
  );
};

export default Energy;
