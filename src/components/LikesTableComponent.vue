<template>
  <div class='mt-10 mb-16'>
    <v-row justify='center'>
      <v-col
        cols='12'
        md='7'
      >
        <v-tabs
          v-model='tab'
          class='d-flex justify-center justify-md-start'
        >
          <v-tab
            v-for='item in items'
            :key='item.tab'
          >
            {{ item.tab }}
          </v-tab>
        </v-tabs>
      </v-col>
      <v-col
        cols='11'
        md='5'
        sm='10'
      >
        <v-text-field
          v-model='search'
          append-icon='mdi-magnify'
          class='mb-4 mb-md-0'
          hide-details
          label='Search'
          single-line
        ></v-text-field>
      </v-col>
    </v-row>
    <v-tabs-items v-model='tab'>
      <v-tab-item
        v-for='item in items'
        :key='item.tab'
      >
        <v-data-table
          :headers='item.headers'
          :items='getLikedItems'
          :search='search'
          class='elevation-1'
          item-key='name'
        >
          <template #item.isLiked='{ item }'>
            <v-btn
              color='pink'
              icon
              @click='deleteItem(item.id)'
            >
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </template>
          <template #item.name='{ item }'>
            <a @click='linkTo("name", item)'>
              {{ item.name }}
            </a>
          </template>
          <template v-if='tab === 0' #item.origin.name='{ item }'>
            <a @click='linkTo("origin", item)'>
              {{ item.origin.name }}
            </a>
          </template>
          <template v-if='tab === 0' #item.location.name='{ item }'>
            <a @click='linkTo("location", item)'>
              {{ item.location.name }}
            </a>
          </template>
        </v-data-table>
      </v-tab-item>
    </v-tabs-items>
    <v-dialog v-model='dialogDelete' max-width='500px'>
      <v-card>
        <v-card-title class='text-h6 justify-center'>Are you sure you want to unlike this item?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color='primary'
            text
            @click='closeDeleteDialog'
          >
            Cancel
          </v-btn>
          <v-btn
            color='primary'
            text
            @click='confirmDelete'
          >
            Yes
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'LikesTableComponent',
  data() {
    return {
      search: '',
      dialogDelete: false,
      tab: null,
      itemLink: {},
      items: [
        {
          tab: 'Characters',
          headers: [
            {
              value: 'isLiked',
              sortable: false
            },
            {
              text: 'Name',
              value: 'name'
            },
            {
              text: 'Status',
              value: 'status'
            },
            {
              text: 'Species',
              value: 'species'
            },
            {
              text: 'Gender',
              value: 'gender'
            },
            {
              text: 'Origin',
              value: 'origin.name'
            },
            {
              text: 'Last Location',
              value: 'location.name'
            }
          ]
        },
        {
          tab: 'Episodes',
          headers: [
            {
              value: 'isLiked',
              sortable: false
            },
            {
              text: 'Name',
              value: 'name'
            },
            {
              text: 'Air Date',
              value: 'air_date'
            },
            {
              text: 'Episode',
              value: 'episode'
            }
          ]
        },
        {
          tab: 'Locations',
          headers: [
            {
              value: 'isLiked',
              sortable: false
            },
            {
              text: 'Name',
              value: 'name'
            },
            {
              text: 'Type',
              value: 'type'
            },
            {
              text: 'Dimension',
              value: 'dimension'
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapState({
      allLikedCharacters: state => state.charactersStore.liked,
      allLikedEpisodes: state => state.episodesStore.likedEpisodes,
      allLikedLocations: state => state.locationsStore.likedLocations,
      getLikedItems() {
        switch (this.tab) {
          case 0:
            return this.allLikedCharacters
          case 1:
            return this.allLikedEpisodes
          case 2:
            return this.allLikedLocations
        }
      }
    })
  },
  methods: {
    ...mapMutations({
      DISLIKE_CHARACTER: 'charactersStore/DISLIKE_CHARACTER',
      DISLIKE_EPISODE: 'episodesStore/DISLIKE_EPISODE',
      DISLIKE_LOCATION: 'locationsStore/DISLIKE_LOCATION'
    }),
    linkTo(link, item) {
      if (this.tab === 0) {
        if (link === 'name') {
          this.$router.push({ name: 'SingleCharacterPage', params: { characterId: item.id } })
        } else if (link === 'origin' && item.origin.url) {
          this.$router.push({ name: 'SingleLocationPage', params: { locationId: item.origin.url.split('/').pop() } })
        } else if (link === 'location' && item.location.url) {
          this.$router.push({ name: 'SingleLocationPage', params: { locationId: item.location.url.split('/').pop() } })
        }
      } else if (this.tab === 1) {
        if (link === 'name')
          this.$router.push({ name: 'SingleEpisodePage', params: { episodeId: item.id } })
      } else if (this.tab === 2) {
        if (link === 'name')
          this.$router.push({ name: 'SingleLocationPage', params: { locationId: item.id } })
      }
    },
    deleteItem(itemId) {
      this.dialogDelete = true
      this.removableItemId = itemId
    },
    confirmDelete() {
      switch (this.tab) {
        case 0:
          this.DISLIKE_CHARACTER(this.removableItemId)
          this.dialogDelete = false
          break
        case 1:
          this.DISLIKE_EPISODE(this.removableItemId)
          this.dialogDelete = false
          break
        case 2:
          this.DISLIKE_LOCATION(this.removableItemId)
          this.dialogDelete = false
      }
    },
    closeDeleteDialog() {
      this.dialogDelete = false
    }
  }
}
</script>

<style scoped>

</style>