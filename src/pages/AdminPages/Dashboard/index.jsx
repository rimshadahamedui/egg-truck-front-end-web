import React from "react";
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

import MiniStatistics from "../../../components/AdminComponents/card/MiniStatistics";
import IconBox from "../../../components/AdminComponents/icons/IconBox";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import DailyTraffic from "../../../components/AdminComponents/Dashboard/DailyTraffic";
import PieCard from "../../../components/AdminComponents/Dashboard/PieCard";
import TotalSpent from "../../../components/AdminComponents/Dashboard/TotalSpent";
import WeeklyRevenue from "../../../components/AdminComponents/Dashboard/WeeklyRevenue";
import { darkCardBg } from "../../../constants";

const Dashboard = () => {
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("gray.50", darkCardBg);
  return (
    <Box>
      <Box pt={{ base: "130px", md: "80px", xl: "40px" }} p="5">
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
          gap="15px"
          mb="10px"
        >
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon
                    w="32px"
                    h="32px"
                    as={MdBarChart}
                    textColor={brandColor}
                  />
                }
              />
            }
            name="Earnings"
            value="$350.4"
          />
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon
                    w="32px"
                    h="32px"
                    as={MdAttachMoney}
                    textColor={brandColor}
                  />
                }
              />
            }
            name="Spend this month"
            value="$642.39"
          />
          <MiniStatistics growth="+23%" name="Sales" value="$574.34" />
          <MiniStatistics
            endContent={
              <Flex me="-16px" mt="10px">
                <FormLabel htmlFor="balance">
                  {/* <Avatar src={Usa} /> */}
                </FormLabel>
                <Select
                  id="balance"
                  variant="mini"
                  mt="5px"
                  me="0px"
                  defaultValue="usd"
                >
                  <option value="usd">USD</option>
                  <option value="eur">EUR</option>
                  <option value="gba">GBA</option>
                </Select>
              </Flex>
            }
            name="Your balance"
            value="$1,000"
          />
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
                icon={<Icon w="28px" h="28px" as={MdAddTask} color="white" />}
              />
            }
            name="New Tasks"
            value="154"
          />
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon
                    w="32px"
                    h="32px"
                    as={MdFileCopy}
                    textColor={brandColor}
                  />
                }
              />
            }
            name="Total Projects"
            value="2935"
          />
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" my="20px">
          <TotalSpent />
          <WeeklyRevenue />
        </SimpleGrid>

        {/* <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px"> */}
        {/* <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          /> */}
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <DailyTraffic />
          <PieCard />
        </SimpleGrid>
        {/* </SimpleGrid> */}
        {/* <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
          <ComplexTable
            columnsData={columnsDataComplex}
            tableData={tableDataComplex}
          />
          <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
            <Tasks />
            <MiniCalendar h="100%" minW="100%" selectRange={false} />
          </SimpleGrid>
        </SimpleGrid> */}
      </Box>
    </Box>
  );
};

export default Dashboard;
