import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useAuth } from '../../Context/AuthContext';
import axiosInstance from '../../utils/axiosInstance';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { BarChart, PieChart, LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const GovernorAnalytics = ({ navigation }) => {
  const { userDetails } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analytics, setAnalytics] = useState({
    casesByStatus: { active: 0, pending: 0, closed: 0 },
    casesByType: { criminal: 0, civil: 0, family: 0, other: 0 },
    casesTimeline: [0, 0, 0, 0, 0, 0],
    lawyerPerformance: [],
    prisonerDemographics: { male: 0, female: 0, other: 0 }
  });
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      // Simulated data since we don't have a real analytics endpoint
      setTimeout(() => {
        setAnalytics({
          casesByStatus: { active: 25, pending: 15, closed: 10 },
          casesByType: { criminal: 20, civil: 15, family: 10, other: 5 },
          casesTimeline: [5, 8, 12, 18, 22, 25],
          lawyerPerformance: [
            { name: 'Rahul Sharma', success: 8, ongoing: 4, lost: 1 },
            { name: 'Priya Patel', success: 6, ongoing: 5, lost: 2 },
            { name: 'Vikram Singh', success: 10, ongoing: 3, lost: 0 },
          ],
          prisonerDemographics: { male: 30, female: 15, other: 5 }
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setError('Failed to load analytics data');
      setLoading(false);
    }
  };

  const renderStatusChart = () => {
    const data = {
      labels: ['Active', 'Pending', 'Closed'],
      datasets: [
        {
          data: [
            analytics.casesByStatus.active,
            analytics.casesByStatus.pending,
            analytics.casesByStatus.closed
          ]
        }
      ]
    };

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Cases by Status</Text>
        <BarChart
          data={data}
          width={width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>
    );
  };

  const renderTypeChart = () => {
    const data = [
      {
        name: 'Criminal',
        population: analytics.casesByType.criminal,
        color: '#FF6B6B',
        legendFontColor: '#7F7F7F',
        legendFontSize: 12
      },
      {
        name: 'Civil',
        population: analytics.casesByType.civil,
        color: '#4ECDC4',
        legendFontColor: '#7F7F7F',
        legendFontSize: 12
      },
      {
        name: 'Family',
        population: analytics.casesByType.family,
        color: '#C44D58',
        legendFontColor: '#7F7F7F',
        legendFontSize: 12
      },
      {
        name: 'Other',
        population: analytics.casesByType.other,
        color: '#556270',
        legendFontColor: '#7F7F7F',
        legendFontSize: 12
      }
    ];

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Cases by Type</Text>
        <PieChart
          data={data}
          width={width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
          }}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"0"}
          center={[0, 0]}
          absolute
        />
      </View>
    );
  };

  const renderTimelineChart = () => {
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          data: analytics.casesTimeline,
          color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
          strokeWidth: 2
        }
      ]
    };

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Cases Timeline</Text>
        <LineChart
          data={data}
          width={width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#4A90E2'
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>
    );
  };

  const renderLawyerPerformance = () => {
    return (
      <View style={styles.tableContainer}>
        <Text style={styles.chartTitle}>Lawyer Performance</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Lawyer</Text>
          <Text style={styles.tableHeaderCell}>Success</Text>
          <Text style={styles.tableHeaderCell}>Ongoing</Text>
          <Text style={styles.tableHeaderCell}>Lost</Text>
        </View>
        {analytics.lawyerPerformance.map((lawyer, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 2 }]}>{lawyer.name}</Text>
            <Text style={[styles.tableCell, { color: '#4CAF50' }]}>{lawyer.success}</Text>
            <Text style={[styles.tableCell, { color: '#2196F3' }]}>{lawyer.ongoing}</Text>
            <Text style={[styles.tableCell, { color: '#F44336' }]}>{lawyer.lost}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderOverviewTab = () => {
    return (
      <>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Icon name="gavel" size={24} color="#4A90E2" />
            <Text style={styles.statValue}>{analytics.casesByStatus.active + analytics.casesByStatus.pending + analytics.casesByStatus.closed}</Text>
            <Text style={styles.statLabel}>Total Cases</Text>
          </View>
          <View style={styles.statCard}>
            <Icon name="user-tie" size={24} color="#4ECDC4" />
            <Text style={styles.statValue}>{analytics.lawyerPerformance.length}</Text>
            <Text style={styles.statLabel}>Lawyers</Text>
          </View>
          <View style={styles.statCard}>
            <Icon name="check-circle" size={24} color="#4CAF50" />
            <Text style={styles.statValue}>{analytics.casesByStatus.closed}</Text>
            <Text style={styles.statLabel}>Resolved</Text>
          </View>
        </View>
        {renderStatusChart()}
        {renderTimelineChart()}
      </>
    );
  };

  const renderCasesTab = () => {
    return (
      <>
        {renderStatusChart()}
        {renderTypeChart()}
        {renderTimelineChart()}
      </>
    );
  };

  const renderLawyersTab = () => {
    return (
      <>
        {renderLawyerPerformance()}
      </>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'cases':
        return renderCasesTab();
      case 'lawyers':
        return renderLawyersTab();
      default:
        return renderOverviewTab();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Case Analytics</Text>
        <TouchableOpacity 
          style={styles.refreshButton}
          onPress={fetchAnalytics}
        >
          <Icon name="sync-alt" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'overview' && styles.activeTabButton]}
          onPress={() => setActiveTab('overview')}
        >
          <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>Overview</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'cases' && styles.activeTabButton]}
          onPress={() => setActiveTab('cases')}
        >
          <Text style={[styles.tabText, activeTab === 'cases' && styles.activeTabText]}>Cases</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'lawyers' && styles.activeTabButton]}
          onPress={() => setActiveTab('lawyers')}
        >
          <Text style={[styles.tabText, activeTab === 'lawyers' && styles.activeTabText]}>Lawyers</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>Loading analytics...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Icon name="exclamation-circle" size={50} color="#F44336" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={fetchAnalytics}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {renderTabContent()}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  refreshButton: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
  },
  activeTabButton: {
    backgroundColor: '#4A90E2',
  },
  tabText: {
    fontSize: 14,
    color: '#666666',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#666666',
    marginTop: 16,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  tableContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color: '#666666',
  },
});

export default GovernorAnalytics;
