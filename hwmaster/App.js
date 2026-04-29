import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

export default function App() {
  const [tab, setTab] = useState("progress");
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");
  const [data, setData] = useState([
    { id: 1, title: "Physics Lab Report", due: "04/21/2024", done: false },
    { id: 2, title: "Math Problem Set", due: "04/22/2024", done: false },
    { id: 3, title: "English Essay Draft", due: "04/24/2024", done: false }
  ]);

  const add = () => {
    if (title === "" || due === "") return;
    setData([...data, { id: Date.now(), title, due, done: false }]);
    setTitle("");
    setDue("");
  };

  const toggle = (id) => {
    setData(
      data.map(i =>
        i.id === id
          ? { ...i, done: !i.done, completed: new Date().toLocaleDateString() }
          : i
      )
    );
  };

  const getColor = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diff = (d - now) / (1000 * 60 * 60 * 24);
    if (diff <= 2) return "red";
    if (diff <= 5) return "orange";
    return "gray";
  };

  const active = data.filter(i => !i.done);
  const completed = data.filter(i => i.done);
  const percent = data.length === 0 ? 0 : Math.round((completed.length / data.length) * 100);

  return (
    <View style={s.container}>

      <View style={s.header}>
        <Text style={s.headerText}>HWMaster</Text>
      </View>

      <View style={s.tabs}>
        <TouchableOpacity onPress={() => setTab("progress")}>
          <Text style={tab === "progress" ? s.activeTab : s.tab}>Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab("active")}>
          <Text style={tab === "active" ? s.activeTab : s.tab}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab("completed")}>
          <Text style={tab === "completed" ? s.activeTab : s.tab}>Completed</Text>
        </TouchableOpacity>
      </View>

      {tab === "progress" && (
        <View style={s.center}>
          <Text style={s.section}>Your Assignment Progress</Text>

          <View style={s.circle}>
            <Text style={s.big}>{percent}%</Text>
            <Text>Completed</Text>
          </View>

          <View style={s.row}>
            <View style={s.box}>
              <Text>Done</Text>
              <Text>{completed.length}</Text>
            </View>
            <View style={s.box}>
              <Text>In Progress</Text>
              <Text>{active.length}</Text>
            </View>
            <View style={s.box}>
              <Text>Total</Text>
              <Text>{data.length}</Text>
            </View>
          </View>

          <View style={s.message}>
            <Text>Great Work! Almost There!</Text>
          </View>
        </View>
      )}

      {tab === "active" && (
        <ScrollView>
          <Text style={s.section}>Your Active Assignments</Text>

          <View style={s.card}>
            <Text>{active.length} Assignments In Progress</Text>
          </View>

          <View style={s.tableHeader}>
            <Text style={s.cell}>#</Text>
            <Text style={s.cell}>Title</Text>
            <Text style={s.cell}>Due</Text>
          </View>

          {active.map((i, index) => (
            <View key={i.id} style={s.rowLine}>
              <TouchableOpacity onPress={() => toggle(i.id)}>
                <Text style={s.cell}>□</Text>
              </TouchableOpacity>
              <Text style={s.cell}>{i.title}</Text>
              <Text style={[s.cell, { color: getColor(i.due) }]}>{i.due}</Text>
            </View>
          ))}

          <View style={s.form}>
            <TextInput
              placeholder="Assignment title..."
              value={title}
              onChangeText={setTitle}
              style={s.input}
            />
            <TextInput
              placeholder="Due date (MM/DD/YYYY)"
              value={due}
              onChangeText={setDue}
              style={s.input}
            />
            <TouchableOpacity onPress={add} style={s.addBtn}>
              <Text style={{ color: "white" }}>+ Add Assignment</Text>
            </TouchableOpacity>
          </View>

          <View style={s.message}>
            <Text>Stay On Top of It — You've Got This!</Text>
          </View>
        </ScrollView>
      )}

      {tab === "completed" && (
        <ScrollView>
          <Text style={s.section}>Your Completed Assignments</Text>

          <View style={s.card}>
            <Text>{completed.length} Assignments Finished</Text>
          </View>

          <View style={s.tableHeader}>
            <Text style={s.cell}>#</Text>
            <Text style={s.cell}>Title</Text>
            <Text style={s.cell}>Completed</Text>
          </View>

          {completed.map((i, index) => (
            <View key={i.id} style={s.rowLine}>
              <Text style={s.cell}>{index + 1}</Text>
              <Text style={s.cell}>{i.title}</Text>
              <Text style={s.cell}>{i.completed}</Text>
            </View>
          ))}

          <View style={s.message}>
            <Text>Awesome Job! Keep Up The Great Work!</Text>
          </View>
        </ScrollView>
      )}

    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ddd" },
  header: { backgroundColor: "#2b6cb0", padding: 15 },
  headerText: { color: "white", fontSize: 20, fontWeight: "bold" },
  tabs: { flexDirection: "row", justifyContent: "space-around", padding: 10, backgroundColor: "#eee" },
  tab: { color: "gray" },
  activeTab: { color: "blue", fontWeight: "bold" },
  section: { textAlign: "center", padding: 10, fontWeight: "bold" },
  center: { alignItems: "center" },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "green",
    justifyContent: "center",
    alignItems: "center",
    margin: 20
  },
  big: { fontSize: 40, fontWeight: "bold" },
  row: { flexDirection: "row", justifyContent: "space-around", width: "100%" },
  box: { backgroundColor: "#ccc", padding: 10, alignItems: "center", width: 90 },
  message: {
    margin: 20,
    padding: 15,
    backgroundColor: "#cbd5e0",
    borderRadius: 10,
    alignItems: "center"
  },
  card: { margin: 10, padding: 10, backgroundColor: "#fff", alignItems: "center" },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#b2f2bb"
  },
  rowLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff"
  },
  cell: { width: "33%" },
  form: { padding: 10 },
  input: {
    backgroundColor: "#333",
    color: "white",
    marginBottom: 10,
    padding: 10
  },
  addBtn: {
    backgroundColor: "#3182ce",
    padding: 10,
    alignItems: "center"
  }
});