
#include "iostream"
#include "iomanip"
#include "conio.h"
#include "string"
#include "fstream"
#include "cstring"
#include "queue"

using namespace std;

inline int delta(int c1, int c2)
{
	if (c1 == c2)
		return 1;
	else return 0;
}

class Graph
{
	public:
	bool weighed = false;
	string name[100] = {};
	int N = 0;
	double edges = 0;
	double a[100][100] = {};
	int cent[100][100] = {};
	int C[100] = {};
	void addV(string s)
	{
		name[++N] = s;
	}
	void addE(string V1, string V2, double weight = 1)
	{
		int i = 0;
		while (V1 != name[i] && i <= N)
			i++;
		if (i > N) cout << "Vertex " << V1 << " Doesn't exist" << endl;
		int j = 0;
		while (V2 != name[j] && j <= N)
			j++;
		if (j > N) cout << "Vertex " << V2 << " Doesn't exist" << endl;
		a[i][j] = weight;
		a[j][i] = weight;
		edges += weight;
	}

	void removeE(int i, int j)
	{
		if (a[i][j] == 0)
		{
			cout << "Error in removeE " << i << " " << j << endl;
		}
		a[i][j] = 0;
		a[j][i] = 0;
	}

	int getNumber(string s)
	{
		for (int i = 1; i <= N; i++)
			if (name[i] == s)
				return i;
		cout << "Could not find the vertex with that name in the graph" << endl;
		return -1;
	}

	void showHere()
	{
		cout << "    ";
		if (weighed)
			cout << setprecision(1) << fixed;
		for (int i = 1; i <= N; i++)
			cout << setw(4) << name[i].substr(0, 3) << ' ';
		cout << endl << endl;
		for (int i = 1; i <= N; i++)
		{
			cout << name[i].substr(0, 4) << "  ";
			for (int j = 1; j <= N; j++)
			{
				cout << setw(4) << right << a[j][i] << ' ';
			}
			cout << endl;
		}
	}
	double degree(int i)
	{
		if (i > N)
		{
			cout << "Current vertex > N in degree counting";
			return -1;
		}
		int s = 0;
		for (int j = 1; j <= N; j++)
		{
			s += a[i][j];
		}
		return s;
	}
	double modularity()
	{
		double s = 0;
		for (int i = 1; i <= N; i++)
			for (int j = 1; j <= N; j++)
			{
				s += (a[i][j] - (degree(i) * degree(j) / (2 * edges))) * delta(C[i], C[j]);
			}
		return s / (2 * edges);
	}

	void betweenness()
	{
		int d[100][100] = {};
		for (int i = 1; i <= N; i++)
			for (int j = 1; j <= N; j++)
				if (a[i][j])
					d[i][j] = a[i][j];
				else if (i == j)
					d[i][j] = 0;
				else
					d[i][j] = 10000;
		for(int m = 1; m <= N; m++)
			for(int i = 1; i <= N; i++)
				for (int j = 1; j <= N; j++)
				{
					if (d[i][j] > d[i][m] + d[m][j])
					{
						cent[i][m]++;
						cent[m][j]++;
						cent[m][i]++;
						cent[j][m]++;
					}
				}
	}
	void getMaxCentrality(int & i, int & j)
	{
		betweenness();
		int max = -1;
		for (int g1 = 1; g1 <= N; g1++)
			for (int g2 = 1; g2 <= N; g2++)
			{
				if (cent[g1][g2] > max && a[g1][g2])
				{
					max = cent[g1][g2];
					i = g1;
					j = g2;
				}
			}
	}
	bool connected(int V1, int V2, bool * visited)
	{
		bool f = false;
		if (V1 == V2)
			return true;
		else
			for (int i = 1; i <= N; i++)
			{
				if (a[V1][i] && !visited[i])
				{
					visited[i] = true;
					f = f || connected(i, V2, visited);
					//visited[i] = false;
				}
			}
		return f;
	}
	void paintIncident(int V, int number, bool * visited)
	{
		C[V] = number;
		for (int i = 1; i <= N; i++)
		{
			if (a[V][i] && !visited[i])
			{
				visited[i] = true;
				paintIncident(i, number, visited);
			}
		}
	}
	bool clean()
	{
		for (int i = 1; i <= N; i++)
			for (int j = 1; j <= N; j++)
				if (a[i][j])
					return false;
		return true;
	}
};

void buildGV(const Graph & g, string name)
{
	char * colors[6] = {"", "blue", "yellow", "red", "green", "firebrick" };

	ofstream f(name + ".gv");
	f.write("graph ", sizeof("graph"));

	char s[50] = {};
	for (int t = 0; t < name.length(); t++)
		s[t] = name[t];
	f.write("G", 1);
	f.write(" {", sizeof("{"));

	char a = 10;
	f.write(&a, sizeof(char));
	for (int i = 1; i <= g.N; i++)
	{
		for (int t = 0; t < 50; t++)
			s[t] = 0;
		for (int t = 0; t < g.name[i].length(); t++)
			s[t] = g.name[i][t];
		f.write(s, strlen(s));
		f.write(" [color=", sizeof("[color="));
		f.write(colors[g.C[i]], strlen(colors[g.C[i]]));
		f.write(", style=filled]", sizeof(",style=filled]"));
		f.write(&a, sizeof(char));
	}
	for (int i = 1; i <= g.N; i++)
	{
		for (int j = i; j <= g.N; j++)
		{
			if (g.a[i][j])
			{
				for (int t = 0; t < 50; t++)
					s[t] = 0;
				for (int t = 0; t < g.name[i].length(); t++)
					s[t] = g.name[i][t];
				f.write(s, strlen(s));
				for (int t = 0; t < 50; t++)
					s[t] = 0;
				for (int t = 0; t < g.name[j].length(); t++)
					s[t] = g.name[j][t];
				f.write(" -- ", sizeof(" --"));
				f.write(s, strlen(s));
				if (g.weighed)
				{
					f.write(" [len=", sizeof("[len="));
					string c = to_string(g.a[i][j]);
					char c1[50] = {};
					for (int i = 0; i < c.length(); i++)
						c1[i] = c[i];
					f.write(c1, strlen(c1));
					f.write(", label=", sizeof(",label="));
					f.write(c1, strlen(c1));
					f.write("]", sizeof(""));
				}
				f.write(&a, sizeof(char));
			}
		}
	}
	f.write("}", sizeof(char));
	f.close();
}

void buildGVB(const Graph & g, string name)
{
	char * colors[6] = { "", "blue", "yellow", "red", "green", "firebrick" };

	ofstream f(name + ".gv");
	f.write("graph ", sizeof("graph"));

	char s[50] = {};
	for (int t = 0; t < name.length(); t++)
		s[t] = name[t];
	f.write("G", 1);
	f.write(" {", sizeof("{"));

	char a = 10;
	f.write(&a, sizeof(char));
	for (int i = 1; i <= g.N; i++)
	{
		for (int t = 0; t < 50; t++)
			s[t] = 0;
		for (int t = 0; t < g.name[i].length(); t++)
			s[t] = g.name[i][t];
		f.write(s, strlen(s));
		f.write(" [color=", sizeof("[color="));
		f.write(colors[g.C[i]], strlen(colors[g.C[i]]));
		f.write(", style=filled]", sizeof(",style=filled]"));
		f.write(&a, sizeof(char));
	}
	for (int i = 1; i <= g.N; i++)
	{
		for (int j = i; j <= g.N; j++)
		{
			if (g.cent[i][j])
			{
				for (int t = 0; t < 50; t++)
					s[t] = 0;
				for (int t = 0; t < g.name[i].length(); t++)
					s[t] = g.name[i][t];
				f.write(s, strlen(s));
				for (int t = 0; t < 50; t++)
					s[t] = 0;
				for (int t = 0; t < g.name[j].length(); t++)
					s[t] = g.name[j][t];
				f.write(" -- ", sizeof(" --"));
				f.write(s, strlen(s));
					f.write(" [len=", sizeof("[len="));
					string c = to_string(g.cent[i][j]);
					char c1[50] = {};
					for (int i = 0; i < c.length(); i++)
						c1[i] = c[i];
					f.write(c1, strlen(c1));
					f.write(", label=", sizeof(",label="));
					f.write(c1, strlen(c1));
					f.write("]", sizeof(""));
				f.write(&a, sizeof(char));
			}
		}
	}
	f.write("}", sizeof(char));
	f.close();
}

void input(string name, Graph & g)
{
	ifstream f(name);
	if (!f)
	{
		cout << "Error! File is not found" << endl;
		return;
	}
	char s[200];
	int minus;
	f.getline(s, 100);
	bool checkweighed = false;
	if (!strcmp(s, "weighed"))
		g.weighed = true;
	else
		g.addV(s);
	while (true)
	{
		f.getline(s, 100);
		bool state = true;
		for (int i = 0; i < strlen(s); i++)
			if (s[i] == '-')
			{
				state = false;
				minus = i;
			}
		if (!state)
			break;
		g.addV(s);
	}
	string x = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
	for (int i = 0; i <= strlen(s); i++)
	{
		x[i] = s[i];
	}
	string s1 = x.substr(0, minus);
	string s2 = x.substr(minus + 1, x.length() - minus);
	int k = s2.find('\0');
	s2 = s2.substr(0, k);
	if ((k = s2.find(' ')) == -1)
		g.addE(s1, s2);
	else
	{
		char d[50] = {};
		for (int i = k + 1; i < s2.length(); i++)
			d[i - k - 1] = s2[i];
		s2 = s2.substr(0, k);
		double w = stod(d);
		g.addE(s1, s2, w);
	}
	while (f)
	{
		f.getline(s, 200);
		if (!f)
			return;
		for (int i = 0; i <= strlen(s); i++)
		{
			x[i] = s[i];
		}
		minus = x.find('-');
		string s1 = x.substr(0, minus);
		string s2 = x.substr(minus + 1, x.length() - minus);
		int k = s2.find('\0');
		s2 = s2.substr(0, k);
		if ((k = s2.find(' ')) == -1)
			g.addE(s1, s2);
		else
		{
			char d[50] = {};
			for (int i = k + 1; i < s2.length(); i++)
				d[i - k - 1] = s2[i];
			s2 = s2.substr(0, k);
			double w = stod(d);
			g.addE(s1, s2, w);
		}
	}
}

void rec(Graph & g, int k, int n, double & max, int c[])
{
	if (n == g.N)
	{
		int a = g.C[1];
		bool f = false;
		for (int i = 2; i <= g.N; i++)
			if (a != g.C[i])
			{
				f = true;
				break;
			}
		if (!f)
			return;
		double m = g.modularity();
		if (m > max)
		{
			max = m;
			for (int i = 1; i <= g.N; i++)
				c[i] = g.C[i];
		}
	}
	else
	{
		n++;
		for (int i = 1; i <= k; i++)
		{
			g.C[n] = i;
			rec(g, k, n, max, c);
		}
	}
}

void coloring(Graph & g, int c[])
{
	for (int i = 1; i <= g.N; i++)
	{
		g.C[i] = c[i];
	}
}

double correctness(int correct[], int checking[], int N)
{
	int max = 0;
	for (int i = 1; i <= N; i++)
	{
		if (correct[i] > max)
			max = correct[i];
	}
	int k = 0;
	bool foundedClusters[100] = {};
	for (int i = 1; i <= max; i++)
	{
		int temp[100] = {};
		int tempN = 0;
		for (int j = 1; j <= N; j++)
		{
			if (correct[j] == i)
			{
				temp[tempN++] = j;
			}
		}
		/*for (int j = 0; j < tempN; j++)
		{
			if (correct[temp[j]] == checking[temp[j]])
				k++;
		}*/
		int a[100] = {};
		for (int j = 0; j < tempN; j++)
			a[checking[temp[j]]]++;
		int localmax = 0;
		for (int j = 1; j <= max; j++)
			if (a[j] > localmax && !foundedClusters[j])
			{
				localmax = a[j];
				foundedClusters[j] = true;
			}
		k += localmax;
	}
	return (double)k / N;
}

bool readCorrect(char * name, int correct[], Graph & g)
{
	ifstream f(name);
	if (!f)
	{
		return false;
	}
	while (f)
	{
		char s[100];
		f.getline(s, 100);
		if (!f)
			break;
		string x = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
		for (int i = 0; i <= strlen(s); i++)
		{
			x[i] = s[i];
		}
		int space = x.find(' ');
		string s1 = x.substr(0, space);
		string s2 = x.substr(space + 1, x.length() - space);
		int k = s2.find('\0');
		s2 = s2.substr(0, k);
		int n = stod(s2);
		correct[g.getNumber(s1)] = n;
	}
	return true;
}

void initClustering(Graph & g, double & maxModularity, int * bestPartition)
{
	int number = 1;
	for (int i = 1; i <= g.N; i++)
	{
		if (!g.C[i])
		{
			bool visited[100] = {};
			visited[i] = true;
			g.paintIncident(i, number, visited);
			number++;
		}
	}
	maxModularity = g.modularity();
	for (int i = 1; i <= g.N; i++)
		bestPartition[i] = g.C[i];
}

void findClusters(Graph g, double & maxModularity, int * bestPartition)
{
	bool numbers[100] = {};
	numbers[1] = true;
	for (int i = 0; i < 100; i++)
		g.C[i] = 1;
	int skokoprowlo = 0;
	while (true)
	{
		int i, j;
		g.getMaxCentrality(i, j);
		g.removeE(i, j);
		bool visited[100] = {};
		visited[i] = true;
		if (g.connected(i, j, visited))
			continue;
		for (int i = 0; i < 100; i++)
			visited[i] = 0;
		visited[j] = true;
		int next = 1;
		while (numbers[next])
			next++;
		numbers[next] = true;
		g.paintIncident(j, next, visited);
		double m = g.modularity();
		if (m > maxModularity)
		{
			maxModularity = m;
			for (int i = 1; i <= g.N; i++)
				bestPartition[i] = g.C[i];
		}
		if (g.clean())
			return;
	}

}

int main()
{
	Graph g;
	input("input.txt", g);

	g.showHere();
	cout << endl;

	int bestPartition[100] = {};
	double maxModularity = 0;
	initClustering(g, maxModularity, bestPartition);
	findClusters(g, maxModularity, bestPartition);

	cout << "max modularity: " << maxModularity << endl;
	cout << "best partition:" << endl;
	for (int i = 1; i <= g.N; i++)
	{
		cout << bestPartition[i] << ' ';
	}

	/*
	int clusters = 4;
	rec(g, clusters, 0, max, c);

	cout << "Modularity: " << max << endl << endl;
	cout << "Program partition" << endl;
	for (int i = 1; i <= g.N; i++)
		cout << c[i] << ' ';
	*/

	coloring(g, bestPartition);
	buildGV(g, "graph");

	/*cout << endl << endl;
	int correct[100];
	if(!readCorrect("correct.txt", correct, g))
	{
		cout << "The correctness file is not found (correct.txt)" << endl;
	}
	else
	{
		cout << "Correct partition" << endl;
		for (int i = 1; i <= g.N; i++)
			cout << correct[i] << ' ';
		cout << endl;
		cout << "Partition correctly by " << correctness(correct, g.C, g.N) * 100 << "%" << endl;
	}

	cout << endl << endl;*/

	/*g.betweenness();
	for (int i = 1; i <= g.N; i++)
	{
		for (int j = 1; j <= g.N; j++)
			cout << g.cent[i][j] << ' ';
		cout << endl;
	}
	buildGVB(g, "graph");*/

	_getch();
	return 0;
}