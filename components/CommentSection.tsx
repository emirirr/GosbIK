import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface Comment {
  id: number;
  author: string;
  authorAvatar: string;
  content: string;
  time: string;
  likes: number;
  isLiked: boolean;
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (comment: string) => void;
  onLikeComment: (commentId: number) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  onAddComment,
  onLikeComment,
}) => {
  const [newComment, setNewComment] = useState('');
  const [showCommentInput, setShowCommentInput] = useState(false);

  const handleSubmitComment = () => {
    if (newComment.trim().length === 0) {
      Alert.alert('Hata', 'Lütfen bir yorum yazın.');
      return;
    }
    
    onAddComment(newComment.trim());
    setNewComment('');
    setShowCommentInput(false);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Yorumlar ({comments.length})</Text>
        <TouchableOpacity 
          onPress={() => setShowCommentInput(!showCommentInput)}
          style={styles.addCommentButton}
        >
          <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <Path d="M12 5V19M5 12H19" stroke="#FFBB01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
        </TouchableOpacity>
      </View>

      {showCommentInput && (
        <View style={styles.commentInputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.commentInput}
              placeholder="Yorumunuzu yazın..."
              value={newComment}
              onChangeText={setNewComment}
              multiline
              maxLength={500}
            />
            <Text style={styles.characterCount}>{newComment.length}/500</Text>
          </View>
          <View style={styles.inputActions}>
            <TouchableOpacity 
              onPress={() => setShowCommentInput(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>İptal</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={handleSubmitComment}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Gönder</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ScrollView style={styles.commentsList} showsVerticalScrollIndicator={false}>
        {comments.length === 0 ? (
          <View style={styles.emptyComments}>
            <Svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <Path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
            <Text style={styles.emptyCommentsText}>Henüz yorum yapılmamış</Text>
            <Text style={styles.emptyCommentsSubtext}>İlk yorumu siz yapın!</Text>
          </View>
        ) : (
          comments.map((comment) => (
            <View key={comment.id} style={styles.commentItem}>
              <Image 
                source={{ uri: comment.authorAvatar }}
                style={styles.commentAuthorAvatar}
              />
              <View style={styles.commentContent}>
                <View style={styles.commentHeader}>
                  <Text style={styles.commentAuthorName}>{comment.author}</Text>
                  <Text style={styles.commentTime}>{comment.time}</Text>
                </View>
                <Text style={styles.commentText}>{comment.content}</Text>
                <TouchableOpacity 
                  onPress={() => onLikeComment(comment.id)}
                  style={styles.commentLikeButton}
                >
                  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <Path 
                      d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7564 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22249 22.4518 8.5C22.4518 7.77751 22.3095 7.0621 22.0329 6.39464C21.7564 5.72718 21.351 5.12075 20.84 4.61Z" 
                      stroke="#666666" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      fill={comment.isLiked ? "#FF6B6B" : "none"}
                    />
                  </Svg>
                  <Text style={[styles.commentLikeText, comment.isLiked && styles.likedCommentText]}>
                    {formatNumber(comment.likes)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191D20',
  },
  addCommentButton: {
    padding: 8,
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
  },
  commentInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  inputWrapper: {
    position: 'relative',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 12,
    paddingBottom: 32,
    fontSize: 14,
    color: '#191D20',
    backgroundColor: '#F8F9FA',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  characterCount: {
    position: 'absolute',
    bottom: 8,
    right: 12,
    fontSize: 12,
    color: '#999999',
  },
  inputActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 12,
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cancelButtonText: {
    fontSize: 14,
    color: '#666666',
  },
  submitButton: {
    backgroundColor: '#FFBB01',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 16,
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#191D20',
  },
  commentsList: {
    maxHeight: 300,
  },
  emptyComments: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyCommentsText: {
    fontSize: 16,
    color: '#666666',
    marginTop: 12,
    marginBottom: 4,
  },
  emptyCommentsSubtext: {
    fontSize: 14,
    color: '#999999',
  },
  commentItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  commentAuthorAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentAuthorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#191D20',
  },
  commentTime: {
    fontSize: 12,
    color: '#999999',
  },
  commentText: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
    marginBottom: 8,
  },
  commentLikeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  commentLikeText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
  },
  likedCommentText: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
});

export default CommentSection;
