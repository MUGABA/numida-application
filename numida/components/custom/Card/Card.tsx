import { StyleSheet, Text, View } from "react-native";
import SmallCustomButton from "../Buttons/SmallCustomButton";
type Props = {
  title: string;
  amount: number;
  interest: number;
  color: string;
  amountSign: string;
};

const Card = ({ title, amount, interest, color, amountSign }: Props) => {
  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <View>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <View>
        <Text style={styles.cardSubText}>Maximum Amount: </Text>
        <Text style={styles.cardText}>
          {amountSign} {amount.toLocaleString()}
        </Text>
      </View>

      <View style={styles.cardButton}>
        <Text style={styles.cardSubText}>intest: {interest} </Text>
        <SmallCustomButton
          buttonTitle="Learn More"
          icon={require("../../../assets/images/Vector.png")}
        />
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    height: 139,
    width: "100%",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "darkgray",
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingVertical: 10,
  },
  cardText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  cardSubText: {
    fontSize: 12,
    fontWeight: "500",
  },
  cardButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
