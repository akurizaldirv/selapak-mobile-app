import {
	View,
	Text,
	Dimensions,
	StyleSheet,
	Image,
	ScrollView,
	TouchableOpacity,
	FlatList,
} from "react-native";
import React, { useState } from "react";
import { Checkbox, useTheme } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import images from "../../../assets/images";
import HeaderWithContent from "../reusables/HeaderWithContent";
import TitleContentItem from "../reusables/TitleContentItem/TitleContentItem";
import Tag from "../reusables/Tag";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Survey = () => {
	const theme = useTheme();
	const { height, width } = Dimensions.get("screen");
	const [checked, setChecked] = useState(false);
	const insets = useSafeAreaInsets();
	const handleCheck = () => setChecked(!checked);

	const styles = StyleSheet.create({
		page: {
			backgroundColor: "white",
			minHeight: height,
			paddingTop: insets.top,
			paddingBottom: insets.bottom,
			padding: 15,
		},
		container: {
			gap: 15
		},
		image: {
			width: 310,
			height: 315,
		},
		header: {
			fontFamily: "PoppinsSemiBold",
			fontSize: 26,
			textAlign: "center",
			color: theme.colors.primary,
		},
		content: {
			width: "100%",
			borderRadius: theme.roundness,
			borderWidth: 1,
			borderStyle: "dashed",
			borderColor: theme.colors.primary,
			padding: 20,
		},
		text: {
			fontFamily: "Poppins",
		},
		textBold: { fontFamily: "PoppinsSemiBold" },
		button: {
			paddingVertical: 15,
			paddingHorizontal: 25,
			borderRadius: theme.roundness,
			backgroundColor: checked ? theme.colors.secondary : theme.colors.accent,
			borderColor: checked ? theme.colors.secondary : theme.colors.accent,
			borderWidth: 2,
		},
		buttonText: {
			textAlign: "center",
			color: "white",
			fontFamily: "PoppinsMedium",
			fontSize: 16,
		},
	});

	const LayoutComponent = () => {
		return (
			<>
				<ScrollView
					style={styles.page}
					contentContainerStyle={styles.container}
				>
					<Image source={images.dealing} style={styles.image} />
					<Text style={styles.header}>Konfirmasi Pesananmu</Text>
					<View style={styles.content}>
						<HeaderWithContent header="Transaksi">
							<View style={{ gap: 5 }}>
								<TitleContentItem head="Nama Bisnis">
									<Text style={styles.textBold}>
										Es Teh Nusantara
									</Text>
								</TitleContentItem>
								<TitleContentItem head="Luas Lapak">
									<Text style={styles.text}>2 x 5 m2</Text>
								</TitleContentItem>
								<TitleContentItem head="Qty">
									<Text style={styles.text}>2 Petak</Text>
								</TitleContentItem>
								<TitleContentItem head="Periode Sewa">
									<Text style={styles.text}>12 Bulan</Text>
								</TitleContentItem>
								<TitleContentItem head="Alamat Lapak">
									<Text style={styles.text}>
										Jl. Topaz 7, Tlogomas, Lowokwaru,
										Malang, 62282
									</Text>
								</TitleContentItem>
								<TitleContentItem head="Total">
									<Text style={styles.textBold}>
										Rp. 12.000.000
									</Text>
								</TitleContentItem>
							</View>
						</HeaderWithContent>
					</View>
					<View style={{ flexDirection: "row" }}>
						<Checkbox
							status={checked ? "checked" : "unchecked"}
							onPress={handleCheck}
							rippleColor={theme.colors.lightGray}
							style={{
								alignItems: "flex-start",
								flexDirection: "row-reverse",
							}}
						/>
						<Text style={{ ...styles.text, marginTop: 7 }}>
							Saya menyetujui
							<Text style={styles.textBold}>
								{" "}
								Kontrak Perjanjian
							</Text>
						</Text>
					</View>
					<View
						style={{ flexDirection: "row", gap: 10, marginTop: 20 }}
					>
						<View style={{ flex: 1 }}>
							<TouchableOpacity
								activeOpacity={0.9}
								style={{
									...styles.button,
									backgroundColor: theme.colors.error,
									borderColor: theme.colors.error,
								}}
							>
								<Text style={styles.buttonText}>Tolak</Text>
							</TouchableOpacity>
						</View>
						<View style={{ flex: 1 }}>
							<TouchableOpacity
								activeOpacity={0.9}
								style={styles.button}
								disabled={!checked}
							>
								<Text style={styles.buttonText}>Terima</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			</>
		);
	};

	return (
		<View>
			<FlatList
				data={[{}]}
				renderItem={LayoutComponent}
				contentContainerStyle={styles.page}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
};

export default Survey;
