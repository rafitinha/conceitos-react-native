import React, {useEffect, useState} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';

const App = () => {

 const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setProjects(response.data);
    });
  }, []);


  async function handleLikeRepository(id) {
    api.post(`/repositories/${id}/like`).then(response => {
      const project = response.data;
      const projectIndex = projects.findIndex(project => project.id === id);
      //projects[projectIndex] = project;
      const copy = [...projects];
      copy[projectIndex] = project;
      setProjects(copy);
      //console.log(projects);
    });
  }


  return (
    <SafeAreaView style={styles.container}>
    {projects.map(project => (
      <View style={styles.repositoryContainer} key={project.id}>
             <Text style={styles.repository}>{project.title}</Text>
              <View style={styles.techsContainer}>
                {project.techs.map(itens => (
                  <Text style={styles.tech} key={itens}>{itens}</Text>
                ))}
              </View>
              <View style={styles.likesContainer}>
               <Text style={styles.likeText} testID={`repository-likes-${project.id}`}>
                {project.likes} curtidas
               </Text>
              </View>
          <View> 
          </View>

           <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(`${project.id}`)}
            testID={`like-button-${project.id}`}
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>
      </View>  
        ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
    paddingTop: 40
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});

export default App;