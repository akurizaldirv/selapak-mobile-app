import {
	View,
	Text,
	FlatList,
	StyleSheet,
	Image,
	TouchableOpacity,
	RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Paragraph, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import images from "../../../assets/images";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getLandAction, selectedLand } from "../../app/feature/land/landSlice";

const refactorDesc = (lands) => {
	return lands.map((item) => ({
		...item,
		description: item.description.split("\n"),
	}));
};

const Home = ({ onTabChange }) => {
	const theme = useTheme();
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();
	const { lands } = useSelector((state) => state.land);
	const dispatch = useDispatch();
	const [isRefreshing, setIsrefreshing] = useState(false);

	useEffect(() => {
		refresh();
		console.log("HEYWOOOO ", lands);
	}, [dispatch]);

	const refresh = async () => {
		await dispatch(getLandAction());
	};

	const openDetail = async (data) => {
		dispatch(selectedLand(data));
		navigation.navigate("LandDetail");
	}

	const styles = StyleSheet.create({
		wrapper: {
			backgroundColor: "white",
			flex: 1,
			paddingTop: insets.top,
			paddingHorizontal: 20,
		},
		head: {
			marginVertical: insets.top,
			marginHorizontal: 20,
			flexDirection: "column",
		},
		h1: {
			fontSize: 28,
			fontFamily: "PoppinsSemiBold",
			marginBottom: -5,
			color: "white",
		},
		tagline: {
			fontFamily: "Poppins",
			fontSize: 16,
			color: "white",
		},
		flex1: { flex: 1 },
		contentContainerWrapper: {
			paddingTop: insets.top,
			backgroundColor: theme.colors.primary,
			flexGrow: 1,
		},
		contentContainer: {
			paddingLeft: 20,
			paddingRight: 40,
			gap: 30,
		},
		textItalic: {
			fontFamily: "PoppinsItalic",
			fontSize: 16,
		},
		dividerWrapper: { flexDirection: "row", alignItems: "center", gap: 10 },
		divider: {
			backgroundColor: theme.colors.primary,
			width: 30,
			height: 2,
		},
		slotArea: {
			backgroundColor: theme.colors.primary,
			borderRadius: theme.roundness,
			height: 25,
			justifyContent: "center",
			paddingTop: 2,
			paddingHorizontal: 15,
		},
		slotAreaItem: { fontFamily: "PoppinsMedium", color: "white" },
		slotCountContainer: {
			justifyContent: "flex-end",
			paddingTop: 2,
		},
		slotCount: { fontFamily: "PoppinsMedium", color: theme.colors.dark },
		cardSlider: {
			backgroundColor: "white",
			borderRadius: theme.roundness,
			padding: 20,
			width: 320,
		},
		width70: { width: "70%" },
		cardTitle: {
			fontFamily: "PoppinsSemiBold",
			fontSize: 24,
		},
		cardImage: {
			position: "absolute",
			top: 0,
			right: -20,
			width: 107,
			height: 131,
		},
		landCardContainer: {
			backgroundColor: theme.colors.lightGray,
			flex: 1,
			flexDirection: "row",
			gap: 10,
			padding: 10,
			borderRadius: 10,
			borderWidth: 1,
			borderColor: theme.colors.primary,
		},
		landImage: {
			width: 100,
			height: 100,
			borderRadius: 5,
			alignSelf: "center",
		},
		cardContent: {
			justifyContent: "space-between",
			flex: 1,
			padding: 5,
		},
		landCardTitle: { fontSize: 18, fontFamily: "PoppinsSemiBold" },
		landCardBottom: {
			flexDirection: "row",
			justifyContent: "space-between",
		},
		main: { padding: 20, marginTop: 20 },
		mainContainer: {
			backgroundColor: "white",
			borderRadius: theme.roundness,
			padding: 20,
			gap: 40,
		},
		mainMenus: {
			flexDirection: "row",
			justifyContent: "space-around",
			alignItems: "flex-start",
			marginVertical: 10,
		},
		mainButton: {
			justifyContent: "center",
			alignItems: "center",
			gap: 5,
		},
		mainButtonIcon: {
			backgroundColor: theme.colors.secondary,
			width: 70,
			height: 70,
			justifyContent: "center",
			alignItems: "center",
			borderRadius: theme.roundness,
		},
		mainButtonText: {
			maxWidth: 70,
			textAlign: "center",
			fontSize: 16,
			fontFamily: "PoppinsMedium",
		},
	});

	const CardSlider = ({ item }) => {
		return (
			<>
				<View style={styles.cardSlider}>
					<View style={styles.width70}>
						<Text style={styles.cardTitle}>{item.title}</Text>
						<Text>{item.body}</Text>
					</View>
				</View>
				<Image source={item.img} style={styles.cardImage} />
			</>
		);
	};

	const LandCardComponent = ({ item }) => {
		return (
			<TouchableOpacity
				activeOpacity={0.9}
				onPress={() => openDetail(item)}
				style={styles.landCardContainer}
			>
				<Image source={{ uri: item.landPhotos[0].imageURL }} style={styles.landImage} />
				<View style={styles.cardContent}>
					<Text style={styles.landCardTitle}>{item.district}</Text>
					<View style={styles.landCardBottom}>
						<View style={styles.slotArea}>
							<Text style={styles.slotAreaItem}>
								{item.slotArea}
							</Text>
						</View>
						<View style={styles.slotCountContainer}>
							<Text style={styles.slotCount}>
								{item.slotAvailable} slots
							</Text>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	const ComponentLayout = () => {
		return (
			<View>
				<View style={styles.head}>
					<Text style={styles.h1}>Selamat Datang</Text>
					<Text style={styles.tagline}>
						Dapatkan pengalaman baik di setiap langkah
					</Text>
				</View>

				<FlatList
					data={[
						{
							title: "Capai Target Pasar",
							body: "Menyesuaikan target bisnis",
							img: images.speaker,
						},
						{
							title: "Harga Terjangkau",
							body: "Menyesuaikan dana usaha",
							img: images.percentage,
						},
					]}
					horizontal={true}
					renderItem={CardSlider}
					key={(item) => item}
					contentContainerStyle={styles.contentContainer}
					showsHorizontalScrollIndicator={false}
				/>

				<View style={styles.main}>
					<View style={styles.mainContainer}>
						<View style={styles.mainMenus}>
							<TouchableOpacity
								activeOpacity={0.9}
								style={styles.mainButton}
							>
								<View style={styles.mainButtonIcon}>
									<FontAwesome5
										name="store"
										size={28}
										color="white"
									/>
								</View>
								<Text style={styles.mainButtonText}>
									Cari Lapak
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								activeOpacity={0.9}
								style={styles.mainButton}
							>
								<View style={styles.mainButtonIcon}>
									<FontAwesome5
										name="credit-card"
										size={28}
										color="white"
									/>
								</View>
								<Text
									style={{
										...styles.mainButtonText,
										maxWidth: 90,
									}}
								>
									Riwayat Transaksi
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								activeOpacity={0.9}
								style={styles.mainButton}
							>
								<View style={styles.mainButtonIcon}>
									<FontAwesome5
										name="file-contract"
										size={28}
										color="white"
									/>
								</View>
								<Text style={styles.mainButtonText}>
									Gabung Mitra
								</Text>
							</TouchableOpacity>
						</View>
						<View>
							<View>
								<View style={styles.dividerWrapper}>
									<View style={styles.divider} />
									<Text style={styles.textItalic}>
										Lapak Terbaru
									</Text>
									<Text
										onPress={() => onTabChange(1)}
										style={{
											...styles.textItalic,
											marginLeft: "auto",
										}}
									>
										Selengkapnya
									</Text>
								</View>
							</View>
							{lands.length === 0 ? (
								<Text>No Data</Text>
							) : (
								<FlatList
									data={
										lands.length > 5
											? refactorDesc(
													lands.slice(0, 5)
											  )
											: refactorDesc(lands)
									}
									// data={dummyData}
									keyExtractor={(item) => item.id}
									renderItem={LandCardComponent}
									style={{ gap: 10, marginTop: 10 }}
								/>
							)}
						</View>
					</View>
				</View>
			</View>
		);
	};

	return (
		<>
			<FlatList
				data={[{}]}
				renderItem={ComponentLayout}
				contentContainerStyle={styles.contentContainerWrapper}
				style={styles.flex1}
				refreshControl={
					<RefreshControl
						refreshing={isRefreshing}
						onRefresh={refresh}
					/>
				}
			/>
		</>
	);
};

export default Home;
